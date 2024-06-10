import { USER } from "../models/user.js";
import { validate } from "../helpers/validate.js";

const createUserValid = (req, res, next) => {
  const error = validate(req.body, USER);
  if (error) {
    return res.sendError(error, 400);
  }

  if ("id" in req.body) {
    return res.sendError("ID should not be provided in the request body", 400);
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const hasValidField = Object.keys(req.body).some((field) => field in USER);

  if (!hasValidField) {
    return res.sendError(
      "At least one valid field is required for update",
      400
    );
  }

  const partialRules = Object.keys(req.body).reduce((acc, key) => {
    if (USER[key]) {
      acc[key] = USER[key];
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

export { createUserValid, updateUserValid };
