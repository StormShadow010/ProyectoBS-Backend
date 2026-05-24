import { Router } from "express";
import * as controller from "./especialidades.controller";
import { authenticate, authorize } from "../../middleware/auth.middleware";

const router = Router();

// Todos los usuarios autenticados pueden ver la lista
router.get("/", authenticate, controller.getAll);

// Solo SUPERADMIN o ADMIN pueden modificar el catálogo
router.post(
  "/",
  authenticate,
  authorize("SUPERADMIN", "ADMIN"),
  controller.create,
);
router.patch(
  "/:id",
  authenticate,
  authorize("SUPERADMIN", "ADMIN"),
  controller.update,
);
router.delete(
  "/:id",
  authenticate,
  authorize("SUPERADMIN", "ADMIN"),
  controller.remove,
);

export default router;
