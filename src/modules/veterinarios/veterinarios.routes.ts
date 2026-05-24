import { Router } from "express";
import * as ctrl from "./veterinarios.controller";
import { authenticate, authorize } from "../../middleware/auth.middleware";

const router = Router();

// Todas las rutas requieren login
router.use(authenticate);

// GET
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);

// POST
router.post("/", authorize("SUPERADMIN", "ADMIN"), ctrl.create);

// PATCH
router.patch("/:id", authorize("SUPERADMIN", "ADMIN"), ctrl.update);

// DELETE
router.delete("/:id", authorize("SUPERADMIN"), ctrl.remove);

export default router;
