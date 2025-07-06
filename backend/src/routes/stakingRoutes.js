const router = require('express').Router();
const stakingController = require('../controllers/stakingController');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

router.get('/status', stakingController.getStakingStatus);
router.post('/start', stakingController.createStake);
router.post('/end', stakingController.unstake);

module.exports = router;