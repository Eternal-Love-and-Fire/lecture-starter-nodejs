import { FIGHTER } from "../models/fighter.js";
import { validate } from "../helpers/validate.js";

const createFighterValid = (req, res, next) => {
  const error = validate(req.body, FIGHTER);
  if (error) {
    return res.sendError(error, 400);
  }

  if ("id" in req.body) {
    return res.sendError("ID should not be provided in the request body", 400);
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const hasValidField = Object.keys(req.body).some((field) => field in FIGHTER);

  if (!hasValidField) {
    return res.sendError(
      "At least one valid field is required for update",
      400
    );
  }

  const partialRules = Object.keys(req.body).reduce((acc, key) => {
    if (FIGHTER[key]) {
      acc[key] = FIGHTER[key];
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
