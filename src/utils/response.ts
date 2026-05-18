import { Response } from "express";
import { ApiResponse } from "../types";

export const ok = <T>(res: Response, data: T, message?: string) => {
  const body: ApiResponse<T> = { success: true, data, message };
  return res.status(200).json(body);
};

export const created = <T>(res: Response, data: T, message?: string) => {
  const body: ApiResponse<T> = { success: true, data, message };
  return res.status(201).json(body);
};

export const fail = (res: Response, message: string, status = 400) => {
  const body: ApiResponse<null> = { success: false, error: message };
  return res.status(status).json(body);
};

export const serverError = (res: Response, err: unknown) => {
  const message = err instanceof Error ? err.message : "Error interno";
  const body: ApiResponse<null> = { success: false, error: message };
  return res.status(500).json(body);
};
