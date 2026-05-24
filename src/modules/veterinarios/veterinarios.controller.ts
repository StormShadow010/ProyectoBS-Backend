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
  } catch (e: any) {
    return serverError(res, e);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = createVeterinarioSchema.parse(req.body);
    const { username, password, ...vetData } = data;
    const password_hash = await bcrypt.hash(password, 10);
    return created(
      res,
      await svc.create({ ...vetData, username, password_hash }),
    );
  } catch (e: any) {
    return fail(res, e.errors?.[0]?.message || "Error");
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = updateVeterinarioSchema.parse(req.body);
    const updated = await svc.update(Number(req.params.id), data);
    if (!updated) return fail(res, "No encontrado", 404);
    return ok(res, updated);
  } catch (e) {
    return serverError(res, e);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const deleted = await svc.remove(Number(req.params.id));
    if (!deleted) return fail(res, "No encontrado", 404);
    return ok(res, null);
  } catch (e) {
    return serverError(res, e);
  }
};
