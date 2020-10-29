const asyncHandler = require('../middleware/async');

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

  let and = [{}];

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
