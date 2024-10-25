const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

/**
 * @param {string} message
 * @param {string} logFileName
 * @description asynchronous function that takes message and filename to create a
 * log file from the filename provided and message to write. if the file already exists,
 * the message will be written to the existing file.
 * @summary a logger function
 */
const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description a costume middleware that logs clients requests in a file called "request.log"
 */
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "request.log");
  next();
};

module.exports = { logEvents, logger };
