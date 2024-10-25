import express from "express";
const router = express.Router();
import {} from "../controllers/task.js";

router.get("/:id", getTask);

router.post("/", createTask);

router.put("/:id", updateTask);

module.exports = router;
