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

// @desc Update existing task
// @route PUT /tasks
// @access Private
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { title, description, priority } = req.body;

    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: `task ${id} not found` });

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.priority = priority ?? task.priority;

    const updatedTask = await task.save();

    res
      .status(200)
      .json({ message: "Task updated successfully!", task: updatedTask });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTaskById, createNewTask, updateTask };

