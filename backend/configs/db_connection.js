const mongoose = require("mongoose");
const { logEvents } = require("../src/middleware/logger.js");

/**
 * this asynchronous function initializing the connection to the MongoDB.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    logEvents(
      `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
      "mongo_error.log"
    );
  }
};

module.exports = connectDB;
