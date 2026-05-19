import { Router } from "express";
import { getAll, getById, create, update, remove } from "./especies.controller";
import { authenticate, authorize } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { createEspecieSchema, updateEspecieSchema } from "./especies.schema";

const router = Router();

router.get("/", authenticate, getAll);
router.get("/:id", authenticate, getById);
router.post(
  "/",
  authenticate,
  authorize("SUPERADMIN", "ADMIN"),
  validate(createEspecieSchema),
  create,
);
router.patch(
  "/:id",
  authenticate,
  authorize("SUPERADMIN", "ADMIN"),
  validate(updateEspecieSchema),
  update,
);
router.delete("/:id", authenticate, authorize("SUPERADMIN"), remove);

export default router;
