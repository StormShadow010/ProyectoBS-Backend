import { Router } from "express";
import { login, register, me } from "./auth.controller";
import { validate } from "../../middleware/validate.middleware";
import { authenticate } from "../../middleware/auth.middleware";
import { loginSchema, registerSchema } from "./auth.schema";

const router = Router();

// POST /api/auth/login
router.post("/login", validate(loginSchema), login);

// POST /api/auth/register — cualquiera puede registrarse
router.post("/register", validate(registerSchema), register);

// GET /api/auth/me — cualquier usuario autenticado
router.get("/me", authenticate, me);

export default router;
