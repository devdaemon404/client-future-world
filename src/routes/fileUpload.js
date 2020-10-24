const express = require('express');
const router = express.Router();

const {
  uploadFile,
  getFile,
  uploadPaySlip,
} = require('../controllers/fileUpload');

const { protect, authorize } = require('../middleware/auth');

router.route('/get-url').get(protect, getFile);
router.route('/upload-url').post(protect, uploadFile);
router
  .route('/financial-document')
  .post(protect, authorize('admin'), uploadPaySlip);

module.exports = router;
