const db = require('../config/database');
const { stakeSchema, unstakeSchema } = require('../utils/validators');
const logger = require('../utils/logger');

const getStakingStatus = async (req, res, next) => {
  try {
    // Get user's stakes
    const stakesResult = await db.query(
      `SELECT * FROM stakes 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    // Calculate totals
    const totalStaked = stakesResult.rows
      .filter(s => s.status === 'active')
      .reduce((sum, s) => sum + parseFloat(s.amount), 0);

    const totalRewards = stakesResult.rows
      .reduce((sum, s) => sum + parseFloat(s.rewards_earned), 0);

    res.json({
      success: true,
      data: {
        totalStaked,
        totalRewards,
        stakes: stakesResult.rows
      }
    });
  } catch (error) {
    next(error);
  }
};

const createStake = async (req, res, next) => {
  const client = await db.getClient();
  
  try {
    const { error, value } = stakeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.details[0].message 
      });
    }

    const { amount } = value;

    // Get user's wallet
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

    // Check balance
    if (parseFloat(wallet.balance) < amount) {
      return res.status(400).json({ 
        success: false, 
        message: 'Insufficient balance' 
      });
    }

    // Get staking APR from settings
    const settingsResult = await client.query(
      "SELECT value FROM settings WHERE key = 'staking_apr'",
      []
    );
    const apr = parseFloat(settingsResult.rows[0]?.value || 5.5);

    await client.query('BEGIN');

    // Create stake
    const stakeResult = await client.query(
      `INSERT INTO stakes (user_id, amount, apr) 
       VALUES ($1, $2, $3) 
       RETURNING id`,
      [req.user.id, amount, apr]
    );

    // Update wallet balance
    await client.query(
      'UPDATE wallets SET balance = balance - $1 WHERE id = $2',
      [amount, wallet.id]
    );

    // Create transaction
    await client.query(
      `INSERT INTO transactions (wallet_id, type, amount, description, reference_id, reference_type) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [wallet.id, 'stake', -amount, 'Staked coins', stakeResult.rows[0].id, 'stake']
    );

    await client.query('COMMIT');

    logger.info(`Stake created: ${req.user.email} - ${amount} coins`);

    res.json({
      success: true,
      message: 'Coins staked successfully',
      data: {
        stakeId: stakeResult.rows[0].id,
        amount,
        apr
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
};

const unstake = async (req, res, next) => {
  const client = await db.getClient();
  
  try {
    const { error, value } = unstakeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.details[0].message 
      });
    }

    const { stakeId } = value;

    // Get stake
    const stakeResult = await client.query(
      'SELECT * FROM stakes WHERE id = $1 AND user_id = $2 AND status = $3 FOR UPDATE',
      [stakeId, req.user.id, 'active']
    );

    if (stakeResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Active stake not found' 
      });
    }

    const stake = stakeResult.rows[0];

    // Calculate rewards
    const daysStaked = Math.floor(
      (Date.now() - new Date(stake.start_date).getTime()) / (1000 * 60 * 60 * 24)
    );
    const rewards = (parseFloat(stake.amount) * parseFloat(stake.apr) / 100 / 365) * daysStaked;

    // Get wallet
    const walletResult = await client.query(
      'SELECT id FROM wallets WHERE user_id = $1',
      [req.user.id]
    );

    await client.query('BEGIN');

    // Update stake
    await client.query(
      `UPDATE stakes 
       SET status = $1, end_date = CURRENT_TIMESTAMP, rewards_earned = $2 
       WHERE id = $3`,
      ['completed', rewards, stakeId]
    );

    // Return principal + rewards to wallet
    const totalAmount = parseFloat(stake.amount) + rewards;
    await client.query(
      'UPDATE wallets SET balance = balance + $1 WHERE user_id = $2',
      [totalAmount, req.user.id]
    );

    // Create transactions
    await client.query(
      `INSERT INTO transactions (wallet_id, type, amount, description, reference_id, reference_type) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [walletResult.rows[0].id, 'unstake', stake.amount, 'Unstaked principal', stakeId, 'stake']
    );

    await client.query(
      `INSERT INTO transactions (wallet_id, type, amount, description, reference_id, reference_type) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [walletResult.rows[0].id, 'reward', rewards, 'Staking rewards', stakeId, 'stake']
    );

    await client.query('COMMIT');

    logger.info(`Stake withdrawn: ${req.user.email} - ${stake.amount} coins + ${rewards} rewards`);

    res.json({
      success: true,
      message: 'Unstaked successfully',
      data: {
        principal: parseFloat(stake.amount),
        rewards,
        total: totalAmount
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
  getStakingStatus,
  createStake,
  unstake
};