const router = require('express').Router();
const learningController = require('../controllers/learningController');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

router.get('/courses', learningController.getCourses);
router.post('/courses/:courseId/start', learningController.startCourse);
router.put('/courses/:courseId/progress', learningController.updateProgress);

module.exports = router;