import { Request, Response } from "express";
import * as svc from "./medicamentos.service";
import { createMedicamentoSchema, updateMedicamentoSchema, ajustarStockSchema } from "./medicamentos.schema";
import { ok, created, fail, serverError } from "../../utils/response";

export const getAll = async (_req: Request, res: Response) => {
  try { return ok(res, await svc.getAll()); }
  catch (e) { return serverError(res, e); }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const item = await svc.getById(Number(req.params.id));
    if (!item) return fail(res, "Medicamento no encontrado", 404);
    return ok(res, item);
  } catch (e) { return serverError(res, e); }
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = createMedicamentoSchema.parse(req.body);
    return created(res, await svc.create(data), "Medicamento creado");
  } catch (e: any) {
    if (e?.errors) return fail(res, e.errors[0]?.message ?? "Datos inválidos");
    return serverError(res, e);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = updateMedicamentoSchema.parse(req.body);
    const item = await svc.update(Number(req.params.id), data);
    if (!item) return fail(res, "Medicamento no encontrado", 404);
    return ok(res, item, "Medicamento actualizado");
  } catch (e: any) {
    if (e?.errors) return fail(res, e.errors[0]?.message ?? "Datos inválidos");
    return serverError(res, e);
  }
};

export const ajustarStock = async (req: Request, res: Response) => {
  try {
    const { cantidad } = ajustarStockSchema.parse(req.body);
    const item = await svc.ajustarStock(Number(req.params.id), cantidad);
    if (!item) return fail(res, "Stock insuficiente o medicamento no encontrado", 400);
    return ok(res, item, "Stock actualizado");
  } catch (e: any) {
    if (e?.errors) return fail(res, e.errors[0]?.message ?? "Datos inválidos");
    return serverError(res, e);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const item = await svc.remove(Number(req.params.id));
    if (!item) return fail(res, "Medicamento no encontrado", 404);
    return ok(res, item, "Medicamento desactivado");
  } catch (e) { return serverError(res, e); }
};
