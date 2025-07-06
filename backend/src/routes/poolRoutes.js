const router = require('express').Router();
const poolController = require('../controllers/poolController');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

router.get('/', poolController.getPools);
router.post('/:poolId/join', poolController.joinPool);
router.post('/:poolId/leave', poolController.leavePool);

module.exports = router;