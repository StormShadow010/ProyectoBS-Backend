import { Router } from "express";
import * as ctrl from "./veterinarios.controller";
import { authenticate, authorize } from "../../middleware/auth.middleware";

const router = Router();

// Todas las rutas requieren que el usuario esté autenticado
router.use(authenticate);

// Listar todos los veterinarios
router.get("/", ctrl.getAll);

// Obtener un veterinario específico por su ID
router.get("/:id", ctrl.getById);

// Crear un nuevo veterinario (Solo SuperAdmin y Admin pueden)
router.post("/", authorize("SUPERADMIN", "ADMIN"), ctrl.create);

// Actualizar datos (Usamos PATCH para coincidir con tu frontend)
// Solo SuperAdmin y Admin pueden realizar actualizaciones
router.patch("/:id", authorize("SUPERADMIN", "ADMIN"), ctrl.update);

// Eliminar/Inactivar (Solo el SuperAdmin puede realizar esta acción)
router.delete("/:id", authorize("SUPERADMIN"), ctrl.remove);

export default router;
