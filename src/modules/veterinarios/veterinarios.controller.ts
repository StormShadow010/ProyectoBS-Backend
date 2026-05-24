import { Request, Response } from "express";
import * as svc from "./veterinarios.service";
import {
  createVeterinarioSchema,
  updateVeterinarioSchema,
} from "./veterinarios.schema";
import { ok, created, fail, serverError } from "../../utils/response";
import bcrypt from "bcryptjs";

export const getAll = async (_req: Request, res: Response) => {
  try {
    return ok(res, await svc.getAll());
  } catch (e) {
    return serverError(res, e);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const data = await svc.getById(Number(req.params.id));
    if (!data) return fail(res, "No encontrado", 404);
    return ok(res, data);
  } catch (e) {
    return serverError(res, e);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = createVeterinarioSchema.parse(req.body);

    // Credenciales auto-generadas: username = cédula, password = cédula hasheada
    const username = data.cedula;
    const password_hash = await bcrypt.hash(data.cedula, 10);

    const nuevoVet = await svc.create({ ...data, username, password_hash });
    return created(res, nuevoVet, "Veterinario creado con éxito");
  } catch (e: any) {
    if (e?.errors) {
      return fail(res, e.errors[0]?.message || "Datos inválidos", 400);
    }
    // Error de cédula/email duplicado (unique constraint de PostgreSQL)
    if (e?.code === "23505") {
      return fail(res, "Ya existe un veterinario con esa cédula o email", 409);
    }
    return serverError(res, e);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = updateVeterinarioSchema.parse(req.body);
    const updated = await svc.update(Number(req.params.id), data);
    if (!updated) return fail(res, "No encontrado", 404);
    return ok(res, updated);
  } catch (e: any) {
    if (e?.errors) {
      return fail(res, e.errors[0]?.message || "Datos inválidos", 400);
    }
    return serverError(res, e);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const deleted = await svc.remove(Number(req.params.id));
    if (!deleted) return fail(res, "No encontrado", 404);
    return ok(res, deleted);
  } catch (e) {
    return serverError(res, e);
  }
};
