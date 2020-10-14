const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getEmployeeInfo,
  changeUserActiveStatus
} = require('../controllers/admin');

const { protect, authorize } = require('../middleware/auth');

router.route('/users').get(protect, authorize('admin'), getAllUsers)
router.route('/change-activity').post(protect, authorize('admin'), changeUserActiveStatus)
router.route('/employee-info').get(protect, authorize('admin'), getEmployeeInfo)

module.exports = router;
