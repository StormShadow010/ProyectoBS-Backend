import { Router } from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "./propietarios.controller";
import { authenticate, authorize } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import {
  createPropietarioSchema,
  updatePropietarioSchema,
} from "./propietarios.schema";

const router = Router();

router.get("/", authenticate, getAll);
router.get("/:id", authenticate, getById);
router.post(
  "/",
  authenticate,
  authorize("SUPERADMIN", "ADMIN", "USUARIO"),
  validate(createPropietarioSchema),
  create,
);
router.patch(
  "/:id",
  authenticate,
  authorize("SUPERADMIN", "ADMIN"),
  validate(updatePropietarioSchema),
  update,
);
router.delete("/:id", authenticate, authorize("SUPERADMIN"), remove);

export default router;
