const express = require("express");
const router = express.Router();

const {
  validateGetTaskById,
  validateGetFilteredTasks,
  validateCreateNewTask,
  validateUpdateTask,
  validateDeleteTaskById,
} = require("../middleware/validation.js");
const {
  getTaskById,
  getFilteredTasks,
  createNewTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.js");

router.get("/", validateGetFilteredTasks, getFilteredTasks);

router.get("/:id", validateGetTaskById, getTaskById);

router.post("/", validateCreateNewTask, createNewTask);

router.put("/:id", validateUpdateTask, updateTask);

router.delete("/:id", validateDeleteTaskById, deleteTask);

module.exports = router;

