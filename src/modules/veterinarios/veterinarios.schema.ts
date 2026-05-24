import { z } from "zod";

export const veterinarioSchema = z.object({
  cedula: z
    .string()
    .regex(/^\d{7,10}$/, "Cédula inválida")
    .trim(),
  nombres: z.string().min(2).max(100).trim(),
  apellidos: z.string().min(2).max(100).trim(),
  telefono: z.string().regex(/^\d+$/, "Solo números").optional(),
  email: z.string().email("Email inválido").trim(),
  id_especialidad: z.number().int().positive().optional(),
  activo: z.boolean().optional(),
});

export const createVeterinarioSchema = veterinarioSchema;
export const updateVeterinarioSchema = veterinarioSchema.partial();

// ¡ESTO ES LO QUE FALTABA!
export type CreateVeterinarioInput = z.infer<typeof createVeterinarioSchema>;
export type UpdateVeterinarioInput = z.infer<typeof updateVeterinarioSchema>;
