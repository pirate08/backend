const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
      required: true,
      trim: true,
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
    priority: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High'],
      default: 'Low',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);
