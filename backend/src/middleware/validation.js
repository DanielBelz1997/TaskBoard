const { param, body, validationResult } = require("express-validator");

const { passToErrorHandler } = require("../utils/validation_error.js");

const validateGetTaskById = [
  param("id").isMongoId().withMessage("Invalid task ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) passToErrorHandler(errors, next);

    next();
  },
];

const validateCreateNewTask = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("priority")
    .notEmpty()
    .isFloat({ min: 0, max: 10 })
    .withMessage("Priority must be a non-negative integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) passToErrorHandler(errors, next);

    next();
  },
];

const validateUpdateTask = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title cannot be empty if provided"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty if provided"),
  body("priority")
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage(
      "Priority must be a non-negative integer between 0 and 10 if provided"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return passToErrorHandler(errors, next);

    next();
  },
];

module.exports = {
  validateGetTaskById,
  validateCreateNewTask,
  validateUpdateTask,
};
