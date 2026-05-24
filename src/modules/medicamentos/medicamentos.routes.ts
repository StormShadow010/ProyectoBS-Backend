import { Router } from "express";
import * as ctrl from "./medicamentos.controller";
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

// PATCH STOCK
router.patch("/:id/stock", authorize("SUPERADMIN", "ADMIN"), ctrl.ajustarStock);

// DELETE
router.delete("/:id", authorize("SUPERADMIN"), ctrl.remove);

export default router;
