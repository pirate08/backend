const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return v.trim().split(/\s+/).length <= 30;
        },
        message: 'Description must not exceed 30 words.',
      },
    },
    dueDate: Date,
    status: {
      type: String,
      required: true,
      enum: ['To-Do', 'In Progress', 'Completed'],
      default: 'To-Do',
    },
    categories: {
      type: String,
      required: true,
      enum: ['Office', 'Personal', 'Home', 'Workout'],
      default: 'Office',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
