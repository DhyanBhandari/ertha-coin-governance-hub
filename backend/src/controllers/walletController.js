const db = require('../config/database');
const { topupSchema, sendSchema } = require('../utils/validators');
const logger = require('../utils/logger');

const getWallet = async (req, res, next) => {
  try {
    const walletResult = await db.query(
      `SELECT w.*, 
        (SELECT COUNT(*) FROM transactions WHERE wallet_id = w.id) as transaction_count
       FROM wallets w 
       WHERE w.user_id = $1`,
      [req.user.id]
    );

    if (walletResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Wallet not found' 
      });
    }

    res.json({
      success: true,
      data: walletResult.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Get wallet
    const walletResult = await db.query(
      'SELECT id FROM wallets WHERE user_id = $1',
      [req.user.id]
    );

    if (walletResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Wallet not found' 
      });
    }

    const walletId = walletResult.rows[0].id;

    // Get transactions with pagination
    const transactionsResult = await db.query(
      `SELECT * FROM transactions 
       WHERE wallet_id = $1 
       ORDER BY created_at DESC 
       LIMIT $2 OFFSET $3`,
      [walletId, limit, offset]
    );

    // Get total count
    const countResult = await db.query(
      'SELECT COUNT(*) FROM transactions WHERE wallet_id = $1',
      [walletId]
    );

    res.json({
      success: true,
      data: {
        transactions: transactionsResult.rows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: parseInt(countResult.rows[0].count),
          pages: Math.ceil(countResult.rows[0].count / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const topupWallet = async (req, res, next) => {
  const client = await db.getClient();
  
  try {
    // Validate input
    const { error, value } = topupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.details[0].message 
      });
    }

    const { amount, paymentMethod } = value;

    // Get wallet
    const walletResult = await client.query(
      'SELECT id, balance FROM wallets WHERE user_id = $1 FOR UPDATE',
      [req.user.id]
    );

    if (walletResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Wallet not found' 
      });
    }

    const wallet = walletResult.rows[0];

    await client.query('BEGIN');

    // Update wallet balance
    const newBalance = parseFloat(wallet.balance) + amount;
    await client.query(
      `UPDATE wallets 
       SET balance = $1, total_earned = total_earned + $2 
       WHERE id = $3`,
      [newBalance, amount, wallet.id]
    );

    // Create transaction
    await client.query(
      `INSERT INTO transactions (wallet_id, type, amount, description, status) 
       VALUES ($1, $2, $3, $4, $5)`,
      [wallet.id, 'earn', amount, `Top-up via ${paymentMethod}`, 'completed']
    );

    await client.query('COMMIT');

    logger.info(`Wallet topped up: ${req.user.email} - ${amount} coins`);

    res.json({
      success: true,
      message: 'Wallet topped up successfully',
      data: {
        newBalance,
        amount
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
};

const sendCoins = async (req, res, next) => {
  const client = await db.getClient();
  
  try {
    // Validate input
    const { error, value } = sendSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.details[0].message 
      });
    }

    const { recipientEmail, amount } = value;

    // Check if sending to self
    if (recipientEmail === req.user.email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot send coins to yourself' 
      });
    }

    await client.query('BEGIN');

    // Get sender wallet
    const senderWalletResult = await client.query(
      'SELECT id, balance FROM wallets WHERE user_id = $1 FOR UPDATE',
      [req.user.id]
    );

    if (senderWalletResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ 
        success: false, 
        message: 'Sender wallet not found' 
      });
    }

    const senderWallet = senderWalletResult.rows[0];

    // Check balance
    if (parseFloat(senderWallet.balance) < amount) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        success: false, 
        message: 'Insufficient balance' 
      });
    }

    // Get recipient
    const recipientResult = await client.query(
      'SELECT id FROM users WHERE email = $1 AND status = $2',
      [recipientEmail, 'active']
    );

    if (recipientResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ 
        success: false, 
        message: 'Recipient not found' 
      });
    }

    // Get recipient wallet
    const recipientWalletResult = await client.query(
      'SELECT id FROM wallets WHERE user_id = $1 FOR UPDATE',
      [recipientResult.rows[0].id]
    );

    if (recipientWalletResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ 
        success: false, 
        message: 'Recipient wallet not found' 
      });
    }

    const recipientWallet = recipientWalletResult.rows[0];

    // Update sender wallet
    await client.query(
      `UPDATE wallets 
       SET balance = balance - $1, total_spent = total_spent + $1 
       WHERE id = $2`,
      [amount, senderWallet.id]
    );

    // Update recipient wallet
    await client.query(
      `UPDATE wallets 
       SET balance = balance + $1, total_earned = total_earned + $1 
       WHERE id = $2`,
      [amount, recipientWallet.id]
    );

    // Create sender transaction
    await client.query(
      `INSERT INTO transactions (wallet_id, type, amount, description, status) 
       VALUES ($1, $2, $3, $4, $5)`,
      [senderWallet.id, 'send', -amount, `Sent to ${recipientEmail}`, 'completed']
    );

    // Create recipient transaction
    await client.query(
      `INSERT INTO transactions (wallet_id, type, amount, description, status) 
       VALUES ($1, $2, $3, $4, $5)`,
      [recipientWallet.id, 'receive', amount, `Received from ${req.user.email}`, 'completed']
    );

    await client.query('COMMIT');

    logger.info(`Coins transferred: ${req.user.email} -> ${recipientEmail} - ${amount} coins`);

    res.json({
      success: true,
      message: 'Coins sent successfully',
      data: {
        amount,
        recipient: recipientEmail,
        newBalance: parseFloat(senderWallet.balance) - amount
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
};

module.exports = {
  getWallet,
  getTransactions,
  topupWallet,
  sendCoins
};