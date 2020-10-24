const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getEmployeeInfo,
  changeUserActiveStatus,
  updateRegisteredUser,
} = require('../controllers/admin');

const { protect, authorize } = require('../middleware/auth');

router.route('/users').get(protect, authorize('admin'), getAllUsers);
router
  .route('/change-activity')
  .post(protect, authorize('admin'), changeUserActiveStatus);
router
  .route('/employee-info/:userId')
  .get(protect, authorize('admin'), getEmployeeInfo);
router
  .route('/register')
  .put(protect, authorize('admin'), updateRegisteredUser);

module.exports = router;
