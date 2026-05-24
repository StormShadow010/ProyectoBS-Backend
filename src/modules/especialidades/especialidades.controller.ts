import { Request, Response } from "express";
import * as service from "./especialidades.service";
import * as resUtil from "../../utils/response";

export const getAll = async (req: Request, res: Response) => {
  try {
    const data = await service.getAll();
    resUtil.ok(res, data);
  } catch (error) {
    resUtil.serverError(res, error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion } = req.body;
    const data = await service.create(nombre, descripcion);
    resUtil.created(res, data);
  } catch (error) {
    resUtil.serverError(res, error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const data = await service.update(
      Number(req.params.id),
      req.body.nombre,
      req.body.descripcion,
    );
    resUtil.ok(res, data, "Actualizado correctamente");
  } catch (error) {
    resUtil.serverError(res, error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await service.remove(Number(req.params.id));
    resUtil.ok(res, null, "Eliminado correctamente");
  } catch (error) {
    resUtil.serverError(res, error);
  }
};
