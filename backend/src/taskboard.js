require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");

const connectDB = require("../configs/db_connection.js");
const corsOptions = require("../configs/cors_options.js");
const errorHandler = require("./middleware/error_handler.js");
const { logger, logEvents } = require("./middleware/logger.js");

const PORT = process.env.PORT || 3000;

const app = express();

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(morgan("dev"));

app.use(`/api`, require(`./api.js`));

// catching all not found routes
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
