import { Request, Response } from "express";
import * as svc from "./tratamientos.service";
import { createTratamientoSchema } from "./tratamientos.schema";
import { ok, created, fail, serverError } from "../../utils/response";

export const getAll = async (_req: Request, res: Response) => {
  try { return ok(res, await svc.getAll()); }
  catch (e) { return serverError(res, e); }
};

export const getByConsulta = async (req: Request, res: Response) => {
  try { return ok(res, await svc.getByConsulta(Number(req.params.id_consulta))); }
  catch (e) { return serverError(res, e); }
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = createTratamientoSchema.parse(req.body);
    return created(res, await svc.create(data), "Tratamiento registrado");
  } catch (e: any) {
    if (e?.errors) return fail(res, e.errors[0]?.message ?? "Datos inválidos");
    return serverError(res, e);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const item = await svc.remove(Number(req.params.id));
    if (!item) return fail(res, "Tratamiento no encontrado", 404);
    return ok(res, item, "Tratamiento eliminado");
  } catch (e) { return serverError(res, e); }
};
