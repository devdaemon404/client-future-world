const express = require('express');
const router = express.Router();

const {
  postEmployeeInfo,
  getEmployeeInfo,
  getFinancialDocs,
} = require('../controllers/employee');

const { protect } = require('../middleware/auth');

router.route('/').post(protect, postEmployeeInfo);
router.route('/').get(protect, getEmployeeInfo);
router.route('/financial-docs').post(protect, getFinancialDocs);

module.exports = router;
