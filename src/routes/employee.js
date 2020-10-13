const express = require('express');
const router = express.Router();

const {
  createEmployee
} = require('../controllers/employee');

const { protect } = require('../middleware/auth');

router.route('/').post(protect, createEmployee)

module.exports = router;
