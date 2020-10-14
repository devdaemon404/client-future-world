const express = require('express');
const router = express.Router();

const {
  postEmployeeInfo,
  getEmployeeInfo
} = require('../controllers/employee');

const { protect } = require('../middleware/auth');

router.route('/').post(protect, postEmployeeInfo)
router.route('/').get(protect, getEmployeeInfo)

module.exports = router;
