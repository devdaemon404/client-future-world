const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Employee = require('../models/Employee');
const User = require('../models/User');

/**
 * @desc    Create employee info
 * @route   POST /api/employee
 * @access  Private
 */
exports.postEmployeeInfo = asyncHandler(async (req, res, next) => {
  const { postParams } = req.body;
  let employee = await Employee.findOne({ user: req.user.id });
  if (!employee) {
    employee = new Employee({
      user: req.user.id,
    });
    await employee.save();
  } else {
    let update = {
      ...postParams,
      updatedAt: Date.now(),
    };
    employee = await Employee.findByIdAndUpdate({ _id: employee._id }, update, {
      new: true,
    });
  }

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
      'photo'
    );
    userPhoto = userPhoto.toObject();
    res.status(200).json({
      success: true,
      message: 'User info',
      data: {
        name: userData.name,
        photo: userPhoto.photo,
      },
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
