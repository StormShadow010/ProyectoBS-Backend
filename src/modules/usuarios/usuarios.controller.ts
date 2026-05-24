import { Request, Response } from "express";
import * as svc from "./usuarios.service";
import { createUsuarioSchema, updateUsuarioSchema } from "./usuarios.schema";
import { ok, created, fail, serverError } from "../../utils/response";

export const getAll = async (_req: Request, res: Response) => {
  try {
    return ok(res, await svc.getAll());
  } catch (e) {
    return serverError(res, e);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const item = await svc.getById(Number(req.params.id));
    if (!item) return fail(res, "Usuario no encontrado", 404);
    return ok(res, item);
  } catch (e) {
    return serverError(res, e);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = createUsuarioSchema.parse(req.body);
    return created(res, await svc.create(data), "Usuario creadoo");
  } catch (e: any) {
    if (e?.errors) return fail(res, e.errors[0]?.message ?? "Datos inválidos");
    if ((e as any)?.code === "23505")
      return fail(res, "Username o email ya existe", 409);
    return serverError(res, e);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = updateUsuarioSchema.parse(req.body);
    const item = await svc.update(Number(req.params.id), data);
    if (!item) return fail(res, "Usuario no encontrado", 404);
    return ok(res, item, "Usuario actualizado");
  } catch (e: any) {
    if (e?.errors) return fail(res, e.errors[0]?.message ?? "Datos inválidos");
    return serverError(res, e);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const item = await svc.remove(Number(req.params.id));
    if (!item) return fail(res, "Usuario no encontrado", 404);
    return ok(res, item, "Usuario desactivado");
  } catch (e) {
    return serverError(res, e);
  }
};
