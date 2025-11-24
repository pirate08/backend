const express = require('express');
const router = express.Router();
const Tasks = require('../models/Task');
const auth = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(auth);

// --Get tasks by summary--
router.get('/summary', async (req, res) => {
  try {
    const totalTasks = await Tasks.countDocuments({ user: req.userId });
    const completedTasks = await Tasks.countDocuments({
      user: req.userId,
      status: 'Completed',
    });
    const highpriorityTasks = await Tasks.countDocuments({
      user: req.userId,
      priority: 'High',
    });
    const pendingTasks = totalTasks - completedTasks;
    const completionRate =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return res.status(200).json({
      totalTasks,
      completedTasks,
      highpriorityTasks,
      pendingTasks,
      completionRate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// -- Get all tasks --
router.get('/', async (req, res) => {
  try {
    const tasks = await Tasks.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// -- Get a single task by ID --
router.get('/:id', async (req, res) => {
  try {
    const task = await Tasks.findOne({ _id: req.params.id, user: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// -- Create a new task --
router.post('/', async (req, res) => {
  try {
    const newTask = new Tasks({
      ...req.body,
      user: req.userId,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// -- Update a task --
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Tasks.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task Not Found' });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// -- Delete a task --
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Tasks.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task is not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
