const { param, body, query, validationResult } = require("express-validator");

const { passToErrorHandler } = require("../utils/validation_error.js");

const validateGetTaskById = [
  param("id").isMongoId().withMessage("Invalid task ID format"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) passToErrorHandler(errors, next);

    next();
  },
];

const validateGetFilteredTasks = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 }) // for safety
    .withMessage("Limit must be a positive integer between 1 and 100"),

  query("priority")
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage("Priority must be a float between 0 and 10"),

  query("title").optional().isString().withMessage("Title must be a string"),

  query("sortBy")
    .optional()
    .isIn(["createdAt", "priority"]) // Add any additional fields you want to allow
    .withMessage("SortBy must be one of: createdAt, priority"),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be either asc or desc"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return passToErrorHandler(errors, next);

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
  validateGetFilteredTasks,
  validateCreateNewTask,
  validateUpdateTask,
};
