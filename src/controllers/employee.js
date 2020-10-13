const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Employee = require('../models/Employee');

// @desc      Create employee info
// @route     POST /api/employee
// @access    Private
exports.createEmployee = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  let employee = await Employee.findOne({ user: req.user.id });
  if (!employee) {
    employee = new Employee({
      user: req.user.id,
      name
    });
    await employee.save();
  } else {
    let update = {
      name,
      updatedAt:Date.now()
    }
    employee = await Employee.findByIdAndUpdate(employee._id, update, {
      new: true,
      runValidators: true,
    });
  }

  res.status(201).json({
    success: true,
    message: 'Created Employee info',
    data: employee,
  });
});
