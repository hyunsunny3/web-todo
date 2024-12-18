import { body } from "express-validator";
import { validationErrorHandler } from "./validationErrorHandler";

export const createTaskValidators = [
  body("date").notEmpty().isDate().withMessage("Valid date require."),
  body("subject").notEmpty().isString().withMessage("Valid date require."),
  validationErrorHandler,
];

export const getAllTasksValidators = [
  body("date").notEmpty().isDate().withMessage("Valid date require."),
  validationErrorHandler,
];

export const updateTaskValidators = [
  body("id").notEmpty().isInt().withMessage("Valid date require."),
  body("subject").notEmpty().isString().withMessage("Valid date require."),
  body("completed").notEmpty().isBoolean().withMessage("Valid date require."),
  validationErrorHandler,
];

export const deleteTaskValidators = [
  body("id").notEmpty().isInt().withMessage("Valid date require."),
  validationErrorHandler,
];
