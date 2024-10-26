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
  body("priority").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) passToErrorHandler(errors, next);

    next();
  },
];

module.exports = { validateGetTaskById, validateCreateNewTask };
