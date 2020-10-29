const AWS = require('aws-sdk');

const asyncHandler = require('../middleware/async');

const Employee = require('../models/Employee');
const User = require('../models/User');
const FinancialDocument = require('../models/FinancialDocument');

const { awsS3AccessKeyId, awsS3SecretAccessKey } = require('../../config/keys');

//Initialize S3 config
const s3 = new AWS.S3({
  accessKeyId: awsS3AccessKeyId,
  secretAccessKey: awsS3SecretAccessKey,
  signatureVersion: 'v4',
  region: 'ap-south-1',
});

/**
 * @desc    Create employee info
 * @route   POST /api/employee
 * @access  Private
 */
exports.postEmployeeInfo = asyncHandler(async (req, res, next) => {
  const { postParams } = req.body;
  let employee = await Employee.findOne({ user: req.user.id });
  let update = {
    ...postParams,
    updatedAt: Date.now(),
  };
  employee = await Employee.findByIdAndUpdate({ _id: employee._id }, update, {
    new: true,
  });

  res.status(201).json({
    success: true,
    message: 'Dumped Employee info',
    data: employee,
  });
});

/**
 * @desc    Get employee info according to querystring select
 * @route   GET /api/employee?select=name
 * @access  Private
 */

exports.getEmployeeInfo = asyncHandler(async (req, res, next) => {
  if (!req.query.select) {
    const userData = await User.findById(req.user.id).select('name');
    let userPhoto = await Employee.findOne({ user: req.user.id }).select(
      'photo isFormComplete joiningDate designation department'
    );
    let data;
    if (userPhoto !== null) {
      userPhoto = userPhoto.toObject();
      data = {
        name: userData.name,
        photo: userPhoto.photo,
      };
    } else {
      data = {
        name: '',
        photo: '',
      };
    }
    return res.status(200).json({
      success: true,
      message: 'User info',
      data,
    });
  }

  const fields = req.query.select.split(',').join(' ');
  const results = await Employee.findOne({ user: req.user.id }).select(fields);

  res.status(200).json({
    success: true,
    message: 'Employee info',
    data: results,
  });
});

/**
 * @desc    Change active status
 * @route   POST /api/employee/financial-docs
 * @access  Private
 */
exports.getFinancialDocs = asyncHandler(async (req, res, next) => {
  const { documentedDate, documentType } = req.body;

  let financialDocuments = await FinancialDocument.find({
    $and: [
      {
        user: req.user.id,
      },
      {
        documentType,
      },
      {
        documentedDate,
      },
    ],
  }).select('-user -_id -createdAt -__v');

  financialDocuments = JSON.parse(JSON.stringify(financialDocuments));

  for (let financialDocument of financialDocuments) {
    let { fileKey } = financialDocument;

    if (!fileKey) continue;

    const params = {
      Bucket: 'random-bucket-1234',
      Expires: 60 * 60,
      ResponseContentType: 'application/pdf',
      Key: `${fileKey}`,
    };

    let url = await s3.getSignedUrl('getObject', params);
    financialDocument.url = url;
  }
  let financialDoc = financialDocuments[financialDocuments.length - 1];
  res.status(200).json({
    success: true,
    message: 'Fetched financial docs',
    data: financialDoc,
  });
});
