import { Request, Response } from "express";
import * as svc from "./consultas.service";
import { createConsultaSchema, updateConsultaSchema } from "./consultas.schema";
import { ok, created, fail, serverError } from "../../utils/response";

export const getAll = async (_req: Request, res: Response) => {
  try { return ok(res, await svc.getAll()); }
  catch (e) { return serverError(res, e); }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const item = await svc.getById(Number(req.params.id));
    if (!item) return fail(res, "Consulta no encontrada", 404);
    return ok(res, item);
  } catch (e) { return serverError(res, e); }
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = createConsultaSchema.parse(req.body);
    return created(res, await svc.create(data), "Consulta registrada");
  } catch (e: any) {
    if (e?.errors) return fail(res, e.errors[0]?.message ?? "Datos inválidos");
    return serverError(res, e);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = updateConsultaSchema.parse(req.body);
    const item = await svc.update(Number(req.params.id), data);
    if (!item) return fail(res, "Consulta no encontrada", 404);
    return ok(res, item, "Consulta actualizada");
  } catch (e: any) {
    if (e?.errors) return fail(res, e.errors[0]?.message ?? "Datos inválidos");
    return serverError(res, e);
  }
};
