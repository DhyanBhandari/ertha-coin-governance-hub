require('dotenv').config();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const db = require('../src/config/database');
const logger = require('../src/utils/logger');

const seedDatabase = async () => {
  try {
    logger.info('Starting database seeding...');

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    
    const adminResult = await db.query(
      `INSERT INTO users (email, password_hash, name, role) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (email) DO UPDATE SET role = 'admin'
       RETURNING id`,
      [adminEmail, passwordHash, 'Admin User', 'admin']
    );

    const adminId = adminResult.rows[0].id;

    // Create admin wallet
    await db.query(
      `INSERT INTO wallets (user_id, address, balance) 
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id) DO NOTHING`,
      [adminId, `erthaloka_admin_${new Date().getFullYear()}`, 10000]
    );

    // Seed courses
    const courses = [
      {
        title: 'Introduction to DAO Governance',
        description: 'Learn the fundamentals of decentralized autonomous organizations.',
        category: 'dao',
        level: 'Beginner',
        duration: 45,
        reward: 25
      },
      {
        title: 'Sustainable Living Practices',
        description: 'Practical strategies for reducing your environmental footprint.',
        category: 'sustainability',
        level: 'Intermediate',
        duration: 60,
        reward: 35
      },
      {
        title: 'Climate Change & Carbon Sequestration',
        description: 'Understanding climate science and nature-based solutions.',
        category: 'environment',
        level: 'Advanced',
        duration: 90,
        reward: 50
      }
    ];

    for (const course of courses) {
      await db.query(
        `INSERT INTO courses (title, description, category, level, duration, reward) 
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT DO NOTHING`,
        Object.values(course)
      );
    }

    // Seed achievements
    const achievements = [
      {
        title: 'First Course',
        description: 'Complete your first course',
        icon: 'BookOpen',
        criteria_type: 'courses_completed',
        criteria_value: 1
      },
      {
        title: 'Sustainability Expert',
        description: 'Complete 5 sustainability courses',
        icon: 'Leaf',
        criteria_type: 'courses_completed',
        criteria_value: 5
      },
      {
        title: 'Active Voter',
        description: 'Cast 50+ votes',
        icon: 'Vote',
        criteria_type: 'votes_cast',
        criteria_value: 50
      }
    ];

    for (const achievement of achievements) {
      await db.query(
        `INSERT INTO achievements (title, description, icon, criteria_type, criteria_value) 
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT DO NOTHING`,
        Object.values(achievement)
      );
    }

    logger.info('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();