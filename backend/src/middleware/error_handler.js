const { logEvents } = require("../middleware/logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "error.log"
  );

  console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; // server error

  res.status(status).json({ message: err.message, isError: true });
};

module.exports = errorHandler;
