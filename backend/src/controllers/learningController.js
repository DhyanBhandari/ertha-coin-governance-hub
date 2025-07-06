const db = require('../config/database');
const logger = require('../utils/logger');

const getCourses = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT c.*, 
        COALESCE(cp.progress, 0) as user_progress,
        COALESCE(cp.completed, false) as user_completed,
        (SELECT COUNT(*) FROM course_progress WHERE course_id = c.id) as enrolled_count
      FROM courses c
      LEFT JOIN course_progress cp ON c.id = cp.course_id AND cp.user_id = $1
      WHERE c.status = 'active'
    `;
    
    const params = [req.user.id];
    
    if (category && category !== 'all') {
      query += ` AND c.category = $${params.length + 1}`;
      params.push(category);
    }
    
    query += ` ORDER BY c.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const coursesResult = await db.query(query, params);

    // Get total count
    let countQuery = "SELECT COUNT(*) FROM courses WHERE status = 'active'";
    const countParams = [];
    
    if (category && category !== 'all') {
      countQuery += ' AND category = $1';
      countParams.push(category);
    }
    
    const countResult = await db.query(countQuery, countParams);

    res.json({
      success: true,
      data: {
        courses: coursesResult.rows,
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

const startCourse = async (req, res, next) => {
  const client = await db.getClient();
  
  try {
    const { courseId } = req.params;

    // Check if course exists
    const courseResult = await client.query(
      'SELECT id FROM courses WHERE id = $1 AND status = $2',
      [courseId, 'active']
    );

    if (courseResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }

    await client.query('BEGIN');

    // Create or update progress
    await client.query(
      `INSERT INTO course_progress (user_id, course_id, progress) 
       VALUES ($1, $2, 0) 
       ON CONFLICT (user_id, course_id) 
       DO UPDATE SET updated_at = CURRENT_TIMESTAMP`,
      [req.user.id, courseId]
    );

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Course started successfully'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
};

const updateProgress = async (req, res, next) => {
  const client = await db.getClient();
  
  try {
    const { courseId } = req.params;
    const { progress } = req.body;

    if (!progress || progress < 0 || progress > 100) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid progress value' 
      });
    }

    // Get current progress
    const currentProgressResult = await client.query(
      'SELECT progress, completed FROM course_progress WHERE user_id = $1 AND course_id = $2',
      [req.user.id, courseId]
    );

    if (currentProgressResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not started' 
      });
    }

    const currentProgress = currentProgressResult.rows[0];

    // Don't allow progress reduction
    if (progress < currentProgress.progress) {
      return res.status(400).json({ 
        success: false, 
        message: 'Progress cannot be reduced' 
      });
    }

    await client.query('BEGIN');

    // Update progress
    const completed = progress === 100;
    await client.query(
      `UPDATE course_progress 
       SET progress = $1, completed = $2, completed_at = $3 
       WHERE user_id = $4 AND course_id = $5`,
      [progress, completed, completed ? new Date() : null, req.user.id, courseId]
    );

    // If completed, give rewards
    if (completed && !currentProgress.completed) {
      // Get course reward
      const courseResult = await client.query(
        'SELECT reward FROM courses WHERE id = $1',
        [courseId]
      );
      
      const reward = parseFloat(courseResult.rows[0].reward);

      // Update wallet
      await client.query(
        'UPDATE wallets SET balance = balance + $1, total_earned = total_earned + $1 WHERE user_id = $2',
        [reward, req.user.id]
      );

      // Get wallet id
      const walletResult = await client.query(
        'SELECT id FROM wallets WHERE user_id = $1',
        [req.user.id]
      );

      // Create transaction
      await client.query(
        `INSERT INTO transactions (wallet_id, type, amount, description, reference_id, reference_type) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [walletResult.rows[0].id, 'reward', reward, 'Course completion reward', courseId, 'course']
      );

      // Check achievements
      await checkLearningAchievements(client, req.user.id);
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: completed ? 'Course completed! Rewards earned.' : 'Progress updated',
      data: {
        progress,
        completed,
        reward: completed && !currentProgress.completed ? courseResult.rows[0].reward : 0
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
};

const checkLearningAchievements = async (client, userId) => {
  // Check completed courses count
  const completedResult = await client.query(
    'SELECT COUNT(*) FROM course_progress WHERE user_id = $1 AND completed = true',
    [userId]
  );
  
  const completedCount = parseInt(completedResult.rows[0].count);

  // Update relevant achievements
  await client.query(
    `INSERT INTO user_achievements (user_id, achievement_id, progress, unlocked, unlocked_at)
     SELECT $1, id, $2, $3, $4
     FROM achievements 
     WHERE criteria_type = 'courses_completed'
     ON CONFLICT (user_id, achievement_id)
     DO UPDATE SET 
       progress = $2,
       unlocked = CASE WHEN $2 >= user_achievements.progress THEN $3 ELSE user_achievements.unlocked END,
       unlocked_at = CASE WHEN $3 = true AND user_achievements.unlocked = false THEN $4 ELSE user_achievements.unlocked_at END`,
    [userId, completedCount, completedCount >= 1, new Date()]
  );
};

module.exports = {
  getCourses,
  startCourse,
  updateProgress
};