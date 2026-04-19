import { Router } from "express";
import authController from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { requireLevel } from "../middleware/authorize.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { authLimiter, loginLimiter } from "../middleware/rate-limiter.js";
import { registerSchema, loginSchema, refreshTokenSchema } from "../validations/auth.validation.js";

const router = Router();

router.post("/register", authLimiter, validate(registerSchema), authController.register);
router.post("/login", loginLimiter, validate(loginSchema), authController.login);
router.post("/logout", authMiddleware, authController.logout);
router.post("/refresh", validate(refreshTokenSchema), authController.refreshToken);
router.get("/profile", authMiddleware, authController.getProfile);
router.get("/sessions", authMiddleware, requireLevel(3), authController.getActiveSessions);
router.get("/sessions/stats", authMiddleware, requireLevel(3), authController.getSessionStats);
router.get("/my-sessions", authMiddleware, authController.getMySessions);

export default router;
