const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../utils/sendMail');

const User = require('../models/User');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, role, phoneNumber } = req.body;

  let password = crypto.randomBytes(8).toString('hex');

  const salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  let user = await User.create({
    name,
    email,
    phoneNumber,
    password: hashedPassword,
    role,
  });

  const message = `Check the credentials : email: ${email}, password: ${password}`;

  await sendEmail({
    email: user.email,
    subject: 'Credentials',
    message,
  });
  user = user.toObject();
  delete user.password;
  res.status(201).json({
    success: true,
    message: 'User created and credentials sent via mail',
    data: user,
  });
});

// @desc      Login user
// @route     POST /api/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  if (user.active !== 1) {
    return next(new ErrorResponse('User\'s account is active or relieved', 401));
  }

  await User.findByIdAndUpdate(user._id, {
    lastLogin: Date.now()
  })

  sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Update password
// @route     PUT /api/auth/update-password
// @access    Private

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  let user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.matchPassword(currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  const salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash(newPassword, salt);

  user = await User.findByIdAndUpdate(req.user.id, { password }, { new: true, runValidators: true })

  sendTokenResponse(user, 200, res);
});

// @desc      Validate Token
// @route     GET /api/auth/validate-token
// @access    Private

exports.validateToken = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  sendTokenResponse(user, 200, res);
});


// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    role: user.role
  });
};