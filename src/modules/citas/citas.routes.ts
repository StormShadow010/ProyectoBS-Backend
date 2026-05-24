import { Router } from "express";
import * as ctrl from "./citas.controller";
import { authenticate, authorize } from "../../middleware/auth.middleware";

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

// GET
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.get("/mascota/:id_mascota", ctrl.getByMascota);

// POST
router.post("/", authorize("SUPERADMIN", "ADMIN", "USUARIO"), ctrl.create);

// PUT
router.put("/:id", authorize("SUPERADMIN", "ADMIN"), ctrl.update);

// DELETE
router.delete("/:id", authorize("SUPERADMIN", "ADMIN"), ctrl.remove);

export default router;
