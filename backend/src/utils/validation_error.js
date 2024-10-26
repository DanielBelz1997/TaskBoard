/**
 * Passes validation errors to the global error handler.
 *
 * @param {Object} errors - The validation errors from `express-validator`.
 * @param {Function} errors.array - Method to convert errors to an array format.
 * @returns {Error} Returns an Error object with validation details for the global error handler.
 *
 * @throws {Error} Throws an error with a 400 status and attaches validation details.
 */
const passToErrorHandler = (errors, next) => {
  const error = new Error("Validation failed");
  error.status = 404;
  error.details = errors.array();
  return next(error);
};

module.exports = { passToErrorHandler };
