import { Router } from "express";
import * as ctrl from "./facturas.controller";
import { authenticate, authorize } from "../../middleware/auth.middleware";

const router = Router();

// Todas requieren autenticación
router.use(authenticate);

// GET
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);

// POST
router.post("/", authorize("SUPERADMIN", "ADMIN"), ctrl.create);

// PUT
router.put("/:id", authorize("SUPERADMIN", "ADMIN"), ctrl.update);

export default router;
