const Task = require("../models/Task.js");

// @desc Get one task
// @route GET /tasks
// @access Private
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: `task ${id} not found` });

    res.json(task);
  } catch (err) {
    next(err);
  }
};

// @desc Create new task
// @route POST /tasks
// @access Private
const createNewTask = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;

    const task = new Task({ title, description, priority });

    await task.save();

    res.status(201).json({ message: "Task created successfully!", task });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTaskById, createNewTask };

