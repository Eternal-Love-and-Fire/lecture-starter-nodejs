import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.use(responseMiddleware);

// TODO: Implement route controllers for user
router.get("/", (req, res) => {
  try {
    const users = userService.index();
    res.sendResponse(users);
  } catch (error) {
    res.sendError(error.message);
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const user = userService.show(id);

    if (!user) {
      res.sendNotFound("User not found");
      return;
    }

    res.sendResponse(user);
  } catch (error) {
    res.sendError(error.message);
  }
});

router.post("/", createUserValid, (req, res) => {
  try {
    const user = req.body;
    const result = userService.store(user);
    res.sendResponse(result);
  } catch (error) {
    res.sendError(error.message);
  }
});
router.patch("/:id", updateUserValid, (req, res) => {
  try {
    const user = req.body;
    const { id } = req.params;
    const result = userService.update(id, user);
    res.sendResponse(result);
  } catch (error) {
    res.sendError(error.message);
  }
});
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const result = userService.destroy(id);
    res.sendResponse(result);
  } catch (error) {
    res.sendError(error.message);
  }
});

export { router };
