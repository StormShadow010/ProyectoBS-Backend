import { Response } from "express";

export const ok = (res: Response, data: any, message = "OK") => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const created = (
  res: Response,
  data: any,
  message = "Creado correctamente",
) => {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
};

export const fail = (res: Response, message: string, status = 400) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

export const serverError = (res: Response, error: any) => {
  return res.status(500).json({
    success: false,
    message: error?.message || "Error interno",
    error,
  });
};
