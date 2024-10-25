const Task = require("../models/Task.js");

// @desc Get one task
// @route GET /tasks
// @access Private
const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ message: `task ${id} not found` });

    res.json(task);
  } catch (err) {
    console.log(err);
  }
};
