import { Request, Response } from "express";
import * as svc from "./veterinarios.service";
import {
  createVeterinarioSchema,
  updateVeterinarioSchema,
} from "./veterinarios.schema";
import { ok, created, fail, serverError } from "../../utils/response";
import bcrypt from "bcryptjs";

// 1. OBTENER TODOS
export const getAll = async (_req: Request, res: Response) => {
  try {
    const data = await svc.getAll();
    return ok(res, data);
  } catch (e: any) {
    return serverError(res, e);
  }
};

// 2. OBTENER POR ID
export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await svc.getById(Number(id));
    if (!data) return fail(res, "Veterinario no encontrado", 404);
    return ok(res, data);
  } catch (e: any) {
    return serverError(res, e);
  }
};

// 3. CREAR
export const create = async (req: Request, res: Response) => {
  try {
    const data = createVeterinarioSchema.parse(req.body);
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(data.password, salt);

    const nuevoVet = await svc.create({ ...data, password_hash });

    return created(
      res,
      nuevoVet,
      "Veterinario y cuenta de acceso creados con éxito",
    );
  } catch (e: any) {
    if (e?.errors) return fail(res, e.errors[0]?.message ?? "Datos inválidos");
    if (e instanceof Error) return fail(res, e.message);
    return serverError(res, e);
  }
};

// 4. ACTUALIZAR
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = updateVeterinarioSchema.parse(req.body);
    const updated = await svc.update(Number(id), data);
    if (!updated) return fail(res, "Veterinario no encontrado", 404);
    return ok(res, updated, "Veterinario actualizado correctamente");
  } catch (e: any) {
    return serverError(res, e);
  }
};

// 5. ELIMINAR (Lógicamente)
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await svc.remove(Number(id));
    if (!deleted) return fail(res, "Veterinario no encontrado", 404);
    return ok(res, null, "Veterinario eliminado correctamente");
  } catch (e: any) {
    return serverError(res, e);
  }
};
