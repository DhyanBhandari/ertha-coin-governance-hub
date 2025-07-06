const cron = require('node-cron');
const db = require('../config/database');
const logger = require('../utils/logger');

// Run daily at midnight to calculate staking rewards
const calculateDailyRewards = async () => {
  const client = await db.getClient();
  
  try {
    logger.info('Starting daily staking rewards calculation...');
    
    await client.query('BEGIN');

    // Get all active stakes
    const stakesResult = await client.query(
      'SELECT * FROM stakes WHERE status = $1',
      ['active']
    );

    for (const stake of stakesResult.rows) {
      // Calculate daily reward
      const dailyReward = (parseFloat(stake.amount) * parseFloat(stake.apr) / 100) / 365;
      
      // Update stake rewards
      await client.query(
        'UPDATE stakes SET rewards_earned = rewards_earned + $1 WHERE id = $2',
        [dailyReward, stake.id]
      );
    }

    await client.query('COMMIT');
    
    logger.info(`Calculated rewards for ${stakesResult.rows.length} active stakes`);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error calculating staking rewards:', error);
  } finally {
    client.release();
  }
};

// Schedule the job
if (process.env.NODE_ENV === 'production') {
  cron.schedule('0 0 * * *', calculateDailyRewards);
  logger.info('Staking rewards job scheduled');
}

module.exports = { calculateDailyRewards };