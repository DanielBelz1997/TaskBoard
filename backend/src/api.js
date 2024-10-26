const express = require("express");
const router = express.Router();

router.use("/tasks", require("./routes/task.js"));

module.exports = router;

