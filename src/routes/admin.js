const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getEmployeeInfo,
  changeUserActiveStatus,
  updateRegisteredUser,
  addReportee,
} = require('../controllers/admin');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/users')
  .get(protect, authorize('admin', 'sub-admin'), getAllUsers);
router
  .route('/change-activity')
  .post(protect, authorize('admin', 'sub-admin'), changeUserActiveStatus);
router
  .route('/employee-info/:userId')
  .get(protect, authorize('admin', 'sub-admin'), getEmployeeInfo);
router
  .route('/register')
  .put(protect, authorize('admin', 'sub-admin'), updateRegisteredUser);
router
  .route('/add-reportee')
  .post(protect, authorize('admin', 'sub-admin'), addReportee);

module.exports = router;
