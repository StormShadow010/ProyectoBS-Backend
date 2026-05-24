import { Request, Response } from "express";
import * as svc from "./veterinarios.service";
import {
  createVeterinarioSchema,
  updateVeterinarioSchema,
} from "./veterinarios.schema";
import { ok, created, fail, serverError } from "../../utils/response";
import bcrypt from "bcryptjs"; // Importación requerida

// ... getAll y getById se quedan exactamente iguales

export const create = async (req: Request, res: Response) => {
  try {
    const data = createVeterinarioSchema.parse(req.body);

    // Generar el hash de la contraseña antes de mandarlo al servicio/repo
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(data.password, salt);

    // Mandamos los datos estructurados
    const nuevoVet = await svc.create({ ...data, password_hash });

    return created(
      res,
      nuevoVet,
      "Veterinario y cuenta de acceso creados con éxito",
    );
  } catch (e: any) {
    if (e?.errors) return fail(res, e.errors[0]?.message ?? "Datos inválidos");
    if (e instanceof Error) return fail(res, e.message);
    return serverError(res, e);
  }
};

// ... update y remove se quedan iguales
