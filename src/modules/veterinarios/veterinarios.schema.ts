import { z } from "zod";

export const veterinarioSchema = z.object({
  cedula: z
    .string()
    .regex(/^\d{7,10}$/, "Cédula debe tener entre 7 y 10 dígitos")
    .trim(),
  nombres: z.string().min(2, "Mínimo 2 caracteres").max(100).trim(),
  apellidos: z.string().min(2, "Mínimo 2 caracteres").max(100).trim(),
  telefono: z
    .string()
    .regex(/^\d+$/, "Solo números")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Email inválido").trim(),
  id_especialidad: z.preprocess(
    (val) =>
      val !== undefined && val !== null && val !== "" ? Number(val) : undefined,
    z.number().int().positive().optional(),
  ),
  activo: z.boolean().optional(),
});

export const createVeterinarioSchema = veterinarioSchema;
export const updateVeterinarioSchema = veterinarioSchema.partial();

export type CreateVeterinarioInput = z.infer<typeof createVeterinarioSchema>;
export type UpdateVeterinarioInput = z.infer<typeof updateVeterinarioSchema>;
