import { Request, Response } from "express";
import {
  getAllPropietariosService,
  getPropietarioByIdService,
  createPropietarioService,
  updatePropietarioService,
  deletePropietarioService,
} from "./propietarios.service";
import { ok, created, fail, serverError } from "../../utils/response";

export const getAll = async (req: Request, res: Response) => {
  try {
    const propietarios = await getAllPropietariosService();
    return ok(res, propietarios);
  } catch (err) {
    return serverError(res, err);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const propietario = await getPropietarioByIdService(id);
    return ok(res, propietario);
  } catch (err) {
    if (err instanceof Error) return fail(res, err.message, 404);
    return serverError(res, err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const propietario = await createPropietarioService(req.body);
    return created(res, propietario, "Propietario creado exitosamente");
  } catch (err) {
    if (err instanceof Error) return fail(res, err.message, 400);
    return serverError(res, err);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const propietario = await updatePropietarioService(id, req.body);
    return ok(res, propietario, "Propietario actualizado exitosamente");
  } catch (err) {
    if (err instanceof Error) return fail(res, err.message, 404);
    return serverError(res, err);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const propietario = await deletePropietarioService(id);
    return ok(res, propietario, "Propietario eliminado exitosamente");
  } catch (err) {
    if (err instanceof Error) return fail(res, err.message, 404);
    return serverError(res, err);
  }
};
