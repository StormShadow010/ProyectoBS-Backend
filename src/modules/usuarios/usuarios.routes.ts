import { Router } from "express";
import * as ctrl from "./usuarios.controller";
import { authenticate, authorize } from "../../middleware/auth.middleware";

const router = Router();

// Todas requieren autenticación
router.use(authenticate);

// Solo SUPERADMIN puede gestionar usuarios
router.use(authorize("SUPERADMIN"));

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

export default router;
