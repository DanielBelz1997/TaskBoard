require("dotenv").config();
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/error_handler.js");
const connectDB = require("../configs/db_connection.js");
const mongoose = require("mongoose");
const corsOptions = require("../configs/cors_options.js");

const PORT = process.env.PORT || 3000;

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(morgan("dev"));

app.use(`/api`, require(`./api.js`));

app.all("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongo_error.log"
  );
});
