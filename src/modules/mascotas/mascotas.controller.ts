import { Request, Response } from "express";
import {
  getAllMascotasService,
  getMascotaByIdService,
  createMascotaService,
  updateMascotaService,
  deleteMascotaService,
} from "./mascotas.service";
import { ok, created, fail, serverError } from "../../utils/response";

export const getAll = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    console.log(user);
    const mascotas = await getAllMascotasService(user.rol, user.id_propietario);
    return ok(res, mascotas);
  } catch (err) {
    return serverError(res, err);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const mascota = await getMascotaByIdService(id);
    return ok(res, mascota);
  } catch (err) {
    if (err instanceof Error) return fail(res, err.message, 404);
    return serverError(res, err);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const mascota = await createMascotaService(
      req.body,
      user.rol,
      user.id_propietario,
    );
    return created(res, mascota, "Mascota creada exitosamente");
  } catch (err) {
    if (err instanceof Error) return fail(res, err.message, 400);
    return serverError(res, err);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const mascota = await updateMascotaService(id, req.body);
    return ok(res, mascota, "Mascota actualizada exitosamente");
  } catch (err) {
    if (err instanceof Error) return fail(res, err.message, 404);
    return serverError(res, err);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const mascota = await deleteMascotaService(id);
    return ok(res, mascota, "Mascota desactivada exitosamente");
  } catch (err) {
    if (err instanceof Error) return fail(res, err.message, 404);
    return serverError(res, err);
  }
};
