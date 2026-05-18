import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";
import { fail } from "../utils/response";

export const validate = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const mensaje = result.error.issues[0].message;
      return fail(res, mensaje, 400);
    }

    req.body = result.data;
    next();
  };
};
