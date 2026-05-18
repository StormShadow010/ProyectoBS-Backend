import { Request, Response } from "express";
import { loginService, registerService } from "./auth.service";
import { ok, created, fail, serverError } from "../../utils/response";

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginService(req.body);
    return ok(res, result, "Login exitoso");
  } catch (err) {
    if (err instanceof Error) {
      return fail(res, err.message, 401);
    }
    return serverError(res, err);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerService(req.body);
    return created(res, result, "Usuario creado exitosamente");
  } catch (err) {
    if (err instanceof Error) {
      return fail(res, err.message, 400);
    }
    return serverError(res, err);
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    return ok(res, user, "Usuario autenticado");
  } catch (err) {
    return serverError(res, err);
  }
};
