const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.use(requireAuth, requireAdmin);

// User management
router.get('/users', adminController.getUsers);
router.put('/users/:userId', adminController.updateUser);
router.delete('/users/:userId', adminController.deleteUser);

// Proposal management
router.post('/proposals/:proposalId/approve', adminController.approveProposal);
router.post('/proposals/:proposalId/reject', adminController.rejectProposal);

// Treasury management
router.get('/treasury', adminController.getTreasury);
router.put('/treasury', adminController.updateTreasury);

// Settings management
router.get('/settings', adminController.getSettings);
router.put('/settings', adminController.updateSettings);

module.exports = router;