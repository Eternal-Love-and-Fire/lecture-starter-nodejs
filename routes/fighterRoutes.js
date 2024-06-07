import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.use(responseMiddleware);

// TODO: Implement route controllers for fighter

router.get("/", (req, res) => {
  try {
    const fighters = fighterService.index();
    res.sendResponse(fighters);
  } catch (error) {
    res.sendError(error.message);
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const fighter = fighterService.show(id);

    if (!fighter) {
      res.sendNotFound("Fighter not found");
      return;
    }

    res.sendResponse(fighter);
  } catch (error) {
    res.sendError(error.message);
  }
});

router.post("/", createFighterValid, (req, res) => {
  try {
    const fighter = req.body;
    const result = fighterService.store(fighter);
    res.sendResponse(result);
  } catch (error) {
    res.sendError(error.message);
  }
});
router.patch("/:id", updateFighterValid, (req, res) => {
  try {
    const fighter = req.body;
    const { id } = req.params;
    const result = fighterService.update(id, fighter);
    res.sendResponse(result);
  } catch (error) {
    res.sendError(error.message);
  }
});
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const result = fighterService.destroy(id);
    res.sendResponse(result);
  } catch (error) {
    res.sendError(error.message);
  }
});
export { router };
