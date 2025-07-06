const db = require('../config/database');
const logger = require('../utils/logger');

const getPools = async (req, res, next) => {
  try {
    const { status = 'active', page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const poolsResult = await db.query(
      `SELECT p.*, 
        COUNT(DISTINCT pp.user_id) as participants,
        EXISTS(SELECT 1 FROM pool_participants WHERE pool_id = p.id AND user_id = $1) as joined
       FROM pools p
       LEFT JOIN pool_participants pp ON p.id = pp.pool_id AND pp.status = 'active'
       WHERE p.status = $2
       GROUP BY p.id
       ORDER BY p.created_at DESC
       LIMIT $3 OFFSET $4`,
      [req.user.id, status, limit, offset]
    );

    const countResult = await db.query(
      'SELECT COUNT(*) FROM pools WHERE status = $1',
      [status]
    );

    res.json({
      success: true,
      data: {
        pools: poolsResult.rows,
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

const joinPool = async (req, res, next) => {
  const client = await db.getClient();
  
  try {
    const { poolId } = req.params;

    await client.query('BEGIN');

    // Check if pool exists and is active
    const poolResult = await client.query(
      'SELECT * FROM pools WHERE id = $1 AND status = $2 FOR UPDATE',
      [poolId, 'active']
    );

    if (poolResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ 
        success: false, 
        message: 'Active pool not found' 
      });
    }

    const pool = poolResult.rows[0];

    // Check if already joined
    const existingResult = await client.query(
      'SELECT id FROM pool_participants WHERE pool_id = $1 AND user_id = $2',
      [poolId, req.user.id]
    );

    if (existingResult.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        success: false, 
        message: 'Already joined this pool' 
      });
    }

    // Check if pool is full
    const participantCountResult = await client.query(
      'SELECT COUNT(*) FROM pool_participants WHERE pool_id = $1 AND status = $2',
      [poolId, 'active']
    );

    if (parseInt(participantCountResult.rows[0].count) >= pool.max_participants) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        success: false, 
        message: 'Pool is full' 
      });
    }

    // Join pool
    await client.query(
      'INSERT INTO pool_participants (pool_id, user_id) VALUES ($1, $2)',
      [poolId, req.user.id]
    );

    await client.query('COMMIT');

    logger.info(`User joined pool: ${req.user.email} - Pool ${poolId}`);

    res.json({
      success: true,
      message: 'Successfully joined the pool'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
};

const leavePool = async (req, res, next) => {
  try {
    const { poolId } = req.params;

    const result = await db.query(
      `UPDATE pool_participants 
       SET status = 'left' 
       WHERE pool_id = $1 AND user_id = $2 AND status = 'active'
       RETURNING id`,
      [poolId, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Active participation not found' 
      });
    }

    logger.info(`User left pool: ${req.user.email} - Pool ${poolId}`);

    res.json({
      success: true,
      message: 'Successfully left the pool'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPools,
  joinPool,
  leavePool
};