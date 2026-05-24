import { z } from "zod";

export const createVeterinarioSchema = z.object({
  cedula:          z.string().min(5).max(20),
  nombres:         z.string().min(2).max(100),
  apellidos:       z.string().min(2).max(100),
  telefono:        z.string().max(20).optional(),
  email:           z.string().email(),
  id_especialidad: z.number().int().positive().optional(),
  activo:          z.boolean().optional(),
});

export const updateVeterinarioSchema = createVeterinarioSchema.partial();

export type CreateVeterinarioInput = z.infer<typeof createVeterinarioSchema>;
export type UpdateVeterinarioInput = z.infer<typeof updateVeterinarioSchema>;
