const db = require('../config/database');
const { requireAdmin } = require('../middleware/auth');
const logger = require('../utils/logger');

const getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT u.*, w.balance as wallet_balance
      FROM users u
      LEFT JOIN wallets w ON u.id = w.user_id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += ` AND u.status = $${params.length + 1}`;
      params.push(status);
    }

    query += ` ORDER BY u.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const usersResult = await db.query(query, params);

    const countQuery = status 
      ? 'SELECT COUNT(*) FROM users WHERE status = $1'
      : 'SELECT COUNT(*) FROM users';
    const countParams = status ? [status] : [];
    const countResult = await db.query(countQuery, countParams);

    res.json({
      success: true,
      data: {
        users: usersResult.rows,
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

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { status, role } = req.body;

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (status) {
      updates.push(`status = $${paramCount}`);
      values.push(status);
      paramCount++;
    }

    if (role) {
      updates.push(`role = $${paramCount}`);
      values.push(role);
      paramCount++;
    }

    if (updates.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No valid updates provided' 
      });
    }

    values.push(userId);
    const result = await db.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING id, email, status, role`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    logger.info(`Admin updated user: ${result.rows[0].email} - Changes: ${updates.join(', ')}`);

    res.json({
      success: true,
      message: 'User updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Soft delete by setting status to 'deleted'
    const result = await db.query(
      `UPDATE users SET status = 'deleted' WHERE id = $1 AND role != 'admin' RETURNING email`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found or cannot delete admin' 
      });
    }

    logger.info(`Admin deleted user: ${result.rows[0].email}`);

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

const approveProposal = async (req, res, next) => {
  try {
    const { proposalId } = req.params;

    const result = await db.query(
      `UPDATE proposals 
       SET status = 'active' 
       WHERE id = $1 AND status = 'pending' 
       RETURNING title`,
      [proposalId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pending proposal not found' 
      });
    }

    logger.info(`Admin approved proposal: ${result.rows[0].title}`);

    res.json({
      success: true,
      message: 'Proposal approved successfully'
    });
  } catch (error) {
    next(error);
  }
};

const rejectProposal = async (req, res, next) => {
  try {
    const { proposalId } = req.params;
    const { reason } = req.body;

    const result = await db.query(
      `UPDATE proposals 
       SET status = 'rejected' 
       WHERE id = $1 AND status = 'pending' 
       RETURNING title`,
      [proposalId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pending proposal not found' 
      });
    }

    logger.info(`Admin rejected proposal: ${result.rows[0].title} - Reason: ${reason || 'Not specified'}`);

    res.json({
      success: true,
      message: 'Proposal rejected successfully'
    });
  } catch (error) {
    next(error);
  }
};

const getTreasury = async (req, res, next) => {
  try {
    const treasuryResult = await db.query('SELECT * FROM treasury LIMIT 1');
    
    const recentTransactionsResult = await db.query(
      `SELECT * FROM treasury_transactions 
       ORDER BY created_at DESC 
       LIMIT 10`
    );

    res.json({
      success: true,
      data: {
        treasury: treasuryResult.rows[0],
        recentTransactions: recentTransactionsResult.rows
      }
    });
  } catch (error) {
    next(error);
  }
};

const updateTreasury = async (req, res, next) => {
  const client = await db.getClient();
  
  try {
    const { amount, type, description } = req.body;

    if (!amount || !type || !description) {
      return res.status(400).json({ 
        success: false, 
        message: 'Amount, type, and description are required' 
      });
    }

    await client.query('BEGIN');

    // Get current treasury
    const treasuryResult = await client.query(
      'SELECT * FROM treasury LIMIT 1 FOR UPDATE'
    );
    const treasury = treasuryResult.rows[0];

    // Update treasury based on type
    const updates = type === 'inflow' 
      ? {
          total_coins: parseFloat(treasury.total_coins) + amount,
          available_coins: parseFloat(treasury.available_coins) + amount
        }
      : {
          total_coins: parseFloat(treasury.total_coins) - amount,
          available_coins: parseFloat(treasury.available_coins) - amount
        };

    if (updates.available_coins < 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        success: false, 
        message: 'Insufficient treasury funds' 
      });
    }

    await client.query(
      `UPDATE treasury 
       SET total_coins = $1, available_coins = $2, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $3`,
      [updates.total_coins, updates.available_coins, treasury.id]
    );

    // Create transaction record
    await client.query(
      `INSERT INTO treasury_transactions (type, amount, description, created_by) 
       VALUES ($1, $2, $3, $4)`,
      [type, amount, description, req.user.id]
    );

    await client.query('COMMIT');

    logger.info(`Admin updated treasury: ${type} ${amount} - ${description}`);

    res.json({
      success: true,
      message: 'Treasury updated successfully',
      data: updates
    });
  } catch (error) {
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
};

const getSettings = async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM settings ORDER BY key');
    
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const { settings } = req.body;

    if (!settings || !Array.isArray(settings)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid settings format' 
      });
    }

    for (const setting of settings) {
      await db.query(
        'UPDATE settings SET value = $1, updated_at = CURRENT_TIMESTAMP WHERE key = $2',
        [setting.value, setting.key]
      );
    }

    logger.info(`Admin updated settings: ${settings.map(s => s.key).join(', ')}`);

    res.json({
      success: true,
      message: 'Settings updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  approveProposal,
  rejectProposal,
  getTreasury,
  updateTreasury,
  getSettings,
  updateSettings
};