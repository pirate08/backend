const express = require('express');
const router = express.Router();
const Tasks = require('../models/Task');

// -- Get all tasks --
router.get('/', async (req, res) => {
  try {
    const tasks = await Tasks.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// -- Get a single task by ID --
router.get('/:id', async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id);
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
    const newTask = new Tasks(req.body);
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// -- Update a task --
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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
    const deletedTask = await Tasks.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task is not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
