const express = require("express");
const router = express.Router();

const {
  validateGetTaskById,
  validateCreateNewTask,
} = require("../middleware/validation.js");
const { getTaskById, createNewTask } = require("../controllers/task.js");

router.get("/:id", validateGetTaskById, getTaskById);

router.post("/", validateCreateNewTask, createNewTask);

router.put("/:id", updateTask);

module.exports = router;

