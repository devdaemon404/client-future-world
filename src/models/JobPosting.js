const mongoose = require('mongoose');

const JobPostingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'users',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('job_postings', JobPostingSchema);
