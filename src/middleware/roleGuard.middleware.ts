import { Request, Response, NextFunction } from "express";
import { Rol } from "../types";
import { fail } from "../utils/response";

export const roleGuard = (...roles: Rol[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.rol)) {
      return fail(res, "No tienes permisos para esta acción", 403);
    }
    next();
  };
};
