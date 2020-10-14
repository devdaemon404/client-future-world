const express = require('express');
const router = express.Router();

const {
  register,
  login,
  logout
} = require('../controllers/auth');

const { protect, authorize } = require('../middleware/auth');

router.post('/register',/* protect, authorize('admin'),*/ register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
