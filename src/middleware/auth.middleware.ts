import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload, Rol } from "../types";
import { fail } from "../utils/response";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return fail(res, "Token requerido", 401);
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    req.user = payload;

    next();
  } catch {
    return fail(res, "Token inválido o expirado", 401);
  }
};

export const authorize = (...roles: Rol[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return fail(res, "Usuario no autenticado", 401);
    }

    if (!roles.includes(user.rol)) {
      return fail(res, "No tienes permisos para esta acción", 403);
    }

    next();
  };
};
