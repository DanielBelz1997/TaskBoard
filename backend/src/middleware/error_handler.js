const { logEvents } = require("../middleware/logger");

/**
 * Middleware function to handle errors in Express routes.
 *
 * @function
 * @param {Error} err - The error object that was thrown in the application.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function in the stack.
 *
 * Logs the error details to "error.log" using `logEvents` and sends a JSON response
 * with the error message and a status code (defaults to 500 if not previously set).
 *
 * @returns {void}
 */
const errorHandler = (err, req, res, next) => {
  const validationError =
    err.message === "Validation failed" ? JSON.stringify(err.details) : "";

  logEvents(
    `${err.name}: ${err.message}\t${validationError}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "error.log"
  );

  console.log(err.stack);

  const status = err.status ? err.status : 500; // server error

  res.status(status).json({
    message: err.message,
    isError: true,
    ...(err.details && { errors: err.details }),
  });
};

module.exports = errorHandler;

