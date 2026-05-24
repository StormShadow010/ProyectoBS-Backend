import { Router } from "express";
import * as ctrl from "./tratamientos.controller";
import { authenticate, authorize } from "../../middleware/auth.middleware";

const router = Router();

// Todas requieren autenticación
router.use(authenticate);

// GET
router.get("/", ctrl.getAll);
router.get("/consulta/:id_consulta", ctrl.getByConsulta);

// POST
router.post("/", authorize("SUPERADMIN", "ADMIN"), ctrl.create);

// DELETE
router.delete("/:id", authorize("SUPERADMIN", "ADMIN"), ctrl.remove);

export default router;
