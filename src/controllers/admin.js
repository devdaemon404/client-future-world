const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendMail');

const User = require('../models/User');
const Employee = require('../models/Employee');
const FinancialDocument = require('../models/FinancialDocument');

/**
 * @desc    Get all users
 * @route   GET /api/admin/users?role=employee
 * @access  Private
 */
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const { role } = req.query;

  let and = [{ isDeleted: false }];

  if (role === 'employee') and.push({ role: 'employee' });
  else if (role === 'sub-admin') and.push({ role: 'sub-admin' });

  if (req.user.role === 'sub-admin') {
    and.push({ reportingTo: { $in: [req.user.id] } });
  }
  const users = await User.find({
    $and: and,
  });

  res.status(200).json({
    success: true,
    message: 'All list of users',
    data: users,
  });
});

/**
 * @desc    Get employee info
 * @route   GET /api/admin/employee-info/:userId?select
 * @access  Private
 */
exports.getEmployeeInfo = asyncHandler(async (req, res, next) => {
  const fields = req.query.select.split(',').join(' ');
  const results = await Employee.findOne({
    user: req.params.userId,
  }).select(fields);
  res.status(200).json({
    success: true,
    data: results,
  });
});

/**
 * @desc    Delete an employee
 * @route   DELETE /api/admin/employee/:id
 * @access  Private
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (user.role === 'sub-admin') {
    return next(new ErrorResponse('Cannot delete of user role sub-admin'));
  }
  user = await User.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    success: true,
    message: 'Deleted User',
    data: user,
  });
});

/**
 * @desc    Change active status
 * @route   POST /api/admin/change-activity
 * @access  Private
 */
exports.changeUserActiveStatus = asyncHandler(async (req, res, next) => {
  const { userId, active } = req.body;

  await User.findByIdAndUpdate(
    userId,
    { active, updatedAt: Date.now() },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    success: true,
    message: "Changed user's active status",
  });
});

/**
 * @desc    Update User details
 * @route   PUT /api/admin/register
 * @access  Private
 */
exports.updateRegisteredUser = asyncHandler(async (req, res, next) => {
  let { userId, updateParams, financialDocument } = req.body;

  if (updateParams) updateParams.password && delete updateParams.password;

  if (financialDocument !== undefined) {
    let { documentType, documentedDate } = financialDocument;
    let finDoc = await FinancialDocument.findOne({
      $and: [{ user: userId }, { documentedDate }, { documentType }],
    });

    if (!finDoc) {
      console.log('new doc');
      financialDocument = new FinancialDocument({
        user: userId,
        ...financialDocument,
      });
      await financialDocument.save();
      return res.status(201).json({
        success: true,
        message: `Document: ${documentType} added for user employee`,
        data: financialDocument,
      });
    }
    console.log('update doc');
    finDoc = await FinancialDocument.findByIdAndUpdate(
      finDoc._id,
      {
        ...financialDocument,
        updatedAt: Date.now(),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(201).json({
      success: true,
      message: `Document: ${documentType} updated for user employee`,
      data: finDoc,
    });
  }

  let employee = await Employee.findOneAndUpdate(
    { user: userId },
    { ...updateParams, updatedAt: Date.now() },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    success: true,
    message: 'Updated user employee',
    data: employee,
  });
});

/**
 * @desc    Add reportingTo to user
 * @route   POST /api/admin/add-reportee
 * @access  Private
 */
exports.addReportee = asyncHandler(async (req, res, next) => {
  const { userId, reporteeId } = req.body;

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        reportingTo: reporteeId,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    success: true,
    message: 'Added reportee to the specified user',
    data: user,
  });
});

/**
 * @desc    Toggle isFormComplete for a user
 * @route   POST /api/admin/toggle-form-completion
 * @access  Private
 */

exports.toggleFormComplete = asyncHandler(async (req, res, next) => {
  const { userId, isFormComplete } = req.body;

  employee = await Employee.findOneAndUpdate(
    { user: userId },
    {
      isFormComplete,
    }
  );

  res.status(200).json({
    success: true,
    message: `Employee form filling ${isFormComplete ? 'Locked' : 'Un-locked'}`,
  });
});

/**
 * @desc    Get all type of financial documents for a employee
 * @route   POST /api/admin/financial-documents
 * @access  Private
 */
exports.getFinancialDocs = asyncHandler(async (req, res, next) => {
  const { userId, documentType } = req.body;

  const findoc = await FinancialDocument.find({
    $and: [{ user: userId }, { documentType }],
  });

  res.status(200).json({
    success: true,
    message: `Got all documents of type ${documentType} for particular employee`,
    data: findoc,
  });
});

const AWS = require('aws-sdk');
const { awsS3AccessKeyId, awsS3SecretAccessKey } = require('../../config/keys');
const { renderResetPasswordTemplate } = require('../views/templates');
//Initialize S3 config
const s3 = new AWS.S3({
  accessKeyId: awsS3AccessKeyId,
  secretAccessKey: awsS3SecretAccessKey,
  signatureVersion: 'v4',
  region: 'ap-south-1',
});

/**
 * @desc    Get a single financial document for a employee
 * @route   POST /api/admin/single-fin-doc
 * @access  Private
 */
exports.getSingleFinancialDoc = asyncHandler(async (req, res, next) => {
  const { userId, documentType, documentedDate } = req.body;

  const findoc = await FinancialDocument.findOne({
    $and: [{ user: userId }, { documentType }, { documentedDate }],
  });
  let url;
  if (findoc) {
    let fileKey = findoc.fileKey;
    const params = {
      Bucket: 'random-bucket-1234',
      Expires: 60 * 60,
      Key: `${fileKey}`,
    };

    url = await s3.getSignedUrl('getObject', params);
  }

  res.status(200).json({
    success: true,
    data: { url },
  });
});

/**
 * @desc    Update User password
 * @route   POST /api/admin/update-password
 * @access  Private
 */

exports.updateUserPassword = asyncHandler(async (req, res, next) => {
  const { userId } = req.body;

  let user = await User.findById(userId);

  if (!user) {
    return next(new ErrorResponse('User not found', 400));
  }
  let password = crypto.randomBytes(8).toString('hex');

  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);

  user = await User.findByIdAndUpdate(
    user._id,
    {
      password: hashedPassword,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  const message = `You are receiving this email because your password has been changed by admin : email: ${user.email}, password: ${password}`;

  await sendEmail({
    email: user.email,
    subject: 'Password Reset',
    html: renderResetPasswordTemplate({ email: user.email, password, domain: process.env.DOMAIN }),
  });

  res.status(200).json({
    success: true,
    message: `Password Reset mail sent to ${user.email}`,
  });
});
