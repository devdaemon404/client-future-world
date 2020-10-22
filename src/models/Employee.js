const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'users',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    photo: {
      type: String,
      default: '',
    },
  },
  { strict: false }
);

module.exports = mongoose.model('employees', EmployeeSchema);
