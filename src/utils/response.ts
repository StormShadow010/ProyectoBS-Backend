import { Response } from "express";

export const ok = (
  res: Response,
  data: any = null,
  message = "Operación exitosa",
  status = 200,
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const fail = (
  res: Response,
  message = "Error",
  status = 400,
  error: any = null,
) => {
  return res.status(status).json({
    success: false,
    message,
    error,
  });
};

export const serverError = (res: Response, error: any) => {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};
