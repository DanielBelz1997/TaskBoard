import express from "express";
const router = express.Router();

router.use("/task", require("./routes/task_routes.js"));

module.exports = router;
