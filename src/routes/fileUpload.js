const express = require('express');
const router = express.Router();

const {
  uploadFile,
  getFile
} = require('../controllers/fileUpload');

const { protect } = require('../middleware/auth');

router.route('/get-url').get(protect, getFile)
router.route('/upload-url').post(protect, uploadFile)

module.exports = router;
