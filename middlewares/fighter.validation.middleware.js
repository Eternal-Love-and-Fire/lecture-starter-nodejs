import { FIGHTER_VALIDATION_RULES } from "../models/fighter.js";

const validate = (data, rules) => {
  for (const key in rules) {
    const rule = rules[key];
    const value = data[key];

    if (rule.required && (value === undefined || value === null)) {
      return `${key} is required`;
    }

    if (value !== undefined && value !== null) {
      if (rule.type && typeof value !== rule.type) {
        return `${key} must be a ${rule.type}`;
      }

      if (rule.min !== undefined && value < rule.min) {
        return `${key} must be at least ${rule.min}`;
      }

      if (rule.max !== undefined && value > rule.max) {
        return `${key} must be at most ${rule.max}`;
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        return `${key} is not in the correct format`;
      }

      if (rule.minLength !== undefined && value.length < rule.minLength) {
        return `${key} must be at least ${rule.minLength} characters long`;
      }
    }
  }
  return null;
};

const createFighterValid = (req, res, next) => {
  const error = validate(req.body, FIGHTER_VALIDATION_RULES);
  if (error) {
    return res.sendError(error, 400);
  }

  if ("id" in req.body) {
    return res.sendError("ID should not be provided in the request body", 400);
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const hasValidField = Object.keys(req.body).some(
    (field) => field in FIGHTER_VALIDATION_RULES
  );

  if (!hasValidField) {
    return res.sendError(
      "At least one valid field is required for update",
      400
    );
  }

  const partialRules = Object.keys(req.body).reduce((acc, key) => {
    if (FIGHTER_VALIDATION_RULES[key]) {
      acc[key] = FIGHTER_VALIDATION_RULES[key];
    }
    return acc;
  }, {});

  const error = validate(req.body, partialRules);
  if (error) {
    return res.sendError(error, 400);
  }

  if ("id" in req.body) {
    return res.sendError("ID should not be provided in the request body", 400);
  }

  next();
};

export { createFighterValid, updateFighterValid };
