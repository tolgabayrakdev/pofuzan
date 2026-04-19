import express from "express";
import personsController from "../controller/persons.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { requireLevel } from "../middleware/authorize.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", requireLevel(1), personsController.getAll);
router.get("/:id", requireLevel(1), personsController.getById);
router.post("/", requireLevel(2), personsController.create);
router.put("/:id", requireLevel(2), personsController.update);
router.put("/:id/access", requireLevel(3), personsController.updateAccess);
router.delete("/:id", requireLevel(3), personsController.delete);

export default router;