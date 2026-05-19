import { Router } from "express";
import { getAll, getById, create, update, remove } from "./mascotas.controller";
import { authenticate, authorize } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { createMascotaSchema, updateMascotaSchema } from "./mascotas.schema";

const router = Router();

// GET /api/mascotas — todos los roles autenticados
router.get("/", authenticate, getAll);

// GET /api/mascotas/:id — todos los roles autenticados
router.get("/:id", authenticate, getById);

// POST /api/mascotas — SUPERADMIN, ADMIN, USUARIO
router.post(
  "/",
  authenticate,
  authorize("SUPERADMIN", "ADMIN", "USUARIO"),
  validate(createMascotaSchema),
  create,
);

// PATCH /api/mascotas/:id — SUPERADMIN, ADMIN
router.patch(
  "/:id",
  authenticate,
  authorize("SUPERADMIN", "ADMIN"),
  validate(updateMascotaSchema),
  update,
);

// DELETE /api/mascotas/:id — SUPERADMIN, ADMIN
router.delete("/:id", authenticate, authorize("SUPERADMIN", "ADMIN"), remove);

export default router;
