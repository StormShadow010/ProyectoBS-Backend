import { Router } from "express";
import * as ctrl from "./veterinarios.controller";
import { authenticate, authorize } from "../../middleware/auth.middleware";

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

// GET /api/v1/veterinarios — listar todos
router.get("/", ctrl.getAll);

// GET /api/v1/veterinarios/:id — obtener uno por ID
router.get("/:id", ctrl.getById);

// POST /api/v1/veterinarios — crear (solo SUPERADMIN y ADMIN)
router.post("/", authorize("SUPERADMIN", "ADMIN"), ctrl.create);

// PATCH /api/v1/veterinarios/:id — actualizar parcialmente (solo SUPERADMIN y ADMIN)
router.patch("/:id", authorize("SUPERADMIN", "ADMIN"), ctrl.update);

// DELETE /api/v1/veterinarios/:id — soft delete / inactivar (solo SUPERADMIN)
router.delete("/:id", authorize("SUPERADMIN"), ctrl.remove);

export default router;
