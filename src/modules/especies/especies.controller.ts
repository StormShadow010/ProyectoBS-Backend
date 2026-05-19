import { Request, Response } from "express";
import {
  getAllEspeciesService,
  getEspecieByIdService,
  createEspecieService,
  updateEspecieService,
  deleteEspecieService,
} from "./especies.service";
import { ok, created, fail, serverError } from "../../utils/response";

export const getAll = async (req: Request, res: Response) => {
  try {
    const especies = await getAllEspeciesService();
    return ok(res, especies);
  } catch (err) {
    return serverError(res, err);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const especie = await getEspecieByIdService(id);
    return ok(res, especie);
  } catch (err) {
    if (err instanceof Error) return fail(res, err.message, 404);
    return serverError(res, err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const especie = await createEspecieService(req.body);
    return created(res, especie, "Especie creada exitosamente");
  } catch (err) {
    if (err instanceof Error) return fail(res, err.message, 400);
    return serverError(res, err);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const especie = await updateEspecieService(id, req.body);
    return ok(res, especie, "Especie actualizada exitosamente");
  } catch (err) {
    if (err instanceof Error) return fail(res, err.message, 404);
    return serverError(res, err);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const especie = await deleteEspecieService(id);
    return ok(res, especie, "Especie eliminada exitosamente");
  } catch (err) {
    if (err instanceof Error) return fail(res, err.message, 404);
    return serverError(res, err);
  }
};
