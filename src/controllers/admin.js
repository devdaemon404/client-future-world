const asyncHandler = require('../middleware/async');

const User = require('../models/User');
const Employee = require('../models/Employee');

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private
 */
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    message: 'All list of users',
    data: users,
  });
});

/**
 * @desc    Get employee info
 * @route   GET /api/admin/employee-info/:employeeId
 * @access  Private
 */
exports.getEmployeeInfo = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findOne({ user: req.params.employeeId });
  res.status(200).json({
    success: true,
    data: employee,
  });
});

/**
 * @desc    Change active status
 * @route   POST /api/admin/change-activity
 * @access  Private
 */
exports.changeUserActiveStatus = asyncHandler(async (req, res, next) => {
  const { employeeId, active } = req.body;

  await User.findByIdAndUpdate(
    employeeId,
    { active },
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
