const asyncHandler = require('../middleware/async');

const User = require('../models/User');

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private
 */
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  res.status(201).json({
    success: true,
    message: 'All list of users',
    data: users,
  });
});

/**
 * @desc    Get all users
 * @route   GET /api/admin/employee-info
 * @access  Private
 */
exports.getEmployeeInfo = asyncHandler(async (req, res, next) => {

  res.status(200).json({
    success: true,
  });
});

/**
 * @desc    Change active status
 * @route   POST /api/admin/change-activity
 * @access  Private
 */
exports.changeUserActiveStatus = asyncHandler(async (req, res, next) => {
  const { employeeId, active } = req.body;

  await User.findByIdAndUpdate(employeeId, { active }, {
    new: true,
    runValidators: true
  });

  res.status(201).json({
    success: true,
    message: 'Changed user\'s active status'
  });
});