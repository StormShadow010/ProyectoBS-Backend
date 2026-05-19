import { z } from "zod";

export const createPropietarioSchema = z.object({
  cedula: z.string().min(1, "La cédula es requerida"),
  nombres: z.string().min(1, "El nombre es requerido"),
  apellidos: z.string().min(1, "Los apellidos son requeridos"),
  telefono: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  direccion: z.string().optional(),
  ciudad: z.string().optional(),
});

export const updatePropietarioSchema = createPropietarioSchema.partial();

export type CreatePropietarioInput = z.infer<typeof createPropietarioSchema>;
export type UpdatePropietarioInput = z.infer<typeof updatePropietarioSchema>;
