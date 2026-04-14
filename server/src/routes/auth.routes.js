import { Router } from "express";
import authController from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);
router.get("/profile", authMiddleware, authController.getProfile);

export default router;
