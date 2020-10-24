const asyncHandler = require('../middleware/async');

const User = require('../models/User');
const Employee = require('../models/Employee');
const FinancialDocument = require('../models/FinancialDocument');

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

/**
 * @desc    Update User details
 * @route   PUT /api/admin/register
 * @access  Private
 */
exports.updateRegisteredUser = asyncHandler(async (req, res, next) => {
  let { userId, updateParams, financialDocument } = req.body;

  if (updateParams) updateParams.password && delete updateParams.password;

  if (financialDocument !== undefined) {
    financialDocument = new FinancialDocument({
      user: userId,
      ...financialDocument,
    });
    await financialDocument.save();
    return res.status(201).json({
      success: true,
      message: 'Document added for user employee',
      data: financialDocument,
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
