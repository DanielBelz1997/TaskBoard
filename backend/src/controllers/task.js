const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 });

const Task = require("../models/Task.js");
const { priorityCalculation } = require("../utils/priority_calculation.js");

// @desc Get one task
// @route GET /tasks/:id
// @access Private
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // check if task is in the cache
    const cachedTask = cache.get(id);
    if (cachedTask) {
      return res.json(cachedTask);
    }

    // fetch task from the database if not in cache
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: `Task ${id} not found` });
    }

    // Store task in cache
    cache.set(id, task);

    res.json(task);
  } catch (err) {
    next(err);
  }
};

// @desc Get all tasks with filter
// @route GET /tasks
// @access Private
const getFilteredTasks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filters = {};
    if (req.query.priority) {
      filters.priority = { $eq: parseFloat(req.query.priority) };
    }
    if (req.query.title) {
      filters.title = { $regex: req.query.title, $options: "i" };
    }
    if (req.query.description) {
      filters.description = { $regex: req.query.description, $options: "i" };
    }

    // sorting
    const sortBy = req.query.sortBy || "_id";
    const order = req.query.order === "desc" ? -1 : 1;

    // total number of tasks with filters
    const totalTasks = await Task.countDocuments(filters);
    const totalPages = Math.ceil(totalTasks / limit);

    const tasks = await Task.find(filters)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    res.json({
      meta: {
        totalTasks,
        totalPages,
        currentPage: page,
        tasksPerPage: limit,
      },
      tasks,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Create new task
// @route POST /tasks
// @access Private
const createNewTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const priority = priorityCalculation(title, description);

    const task = new Task({ title, description, priority });

    await task.save();

    res.status(201).json({ message: "Task created successfully!", task });
  } catch (err) {
    next(err);
  }
};

// @desc Update existing task
// @route PUT /tasks/:id
// @access Private
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { title, description } = req.body;

    const priority = priorityCalculation(title, description);

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

module.exports = { getTaskById, getFilteredTasks, createNewTask, updateTask };

