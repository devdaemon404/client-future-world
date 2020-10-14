const AWS = require('aws-sdk');

const asyncHandler = require('../middleware/async');

const { awsS3AccessKeyId, awsS3SecretAccessKey } = require('../../config/keys');

//Initialize S3 config
const s3 = new AWS.S3({
  accessKeyId: awsS3AccessKeyId,
  secretAccessKey: awsS3SecretAccessKey,
  signatureVersion: 'v4',
  region: 'ap-south-1',
});

/**
 * @desc    Upload file to aws s3
 * @route   GET /api/file/upload-url
 * @access  Private
 */
exports.uploadFile = asyncHandler(async (req, res, next) => {
  const { fileName, fileType, fileExtension } = req.body;

  let fileKey;
  if (fileType === 'doc')
    fileKey = `${req.user.id}/doc/${fileName}.${fileExtension}`;
  else if (fileType === 'photo') {
    fileKey = `photos/${req.user.id}.${fileExtension}`;
  }

  const params = {
    Bucket: 'random-bucket-1234',
    ContentType: fileExtension,
    Expires: 60 * 60,
    Key: fileKey,
  };

  const url = await s3.getSignedUrl('putObject', params);

  res.status(200).json({
    success: true,
    message: 'Created PUT url for file upload',
    fileKey,
    url
  });
});


/**
 * @desc    Get a file from aws s3
 * @route   GET /api/file/get-url
 * @access  Private
 */
exports.getFile = asyncHandler(async (req, res, next) => {
  const { fileKey } = req.query;
  const params = {
    Bucket: 'random-bucket-1234',
    Expires: 60 * 60,
    Key: `${fileKey}`,
  };

  const url = await s3.getSignedUrl('getObject', params);

  // res.redirect(url)
  res.status(200).json({ url });
});