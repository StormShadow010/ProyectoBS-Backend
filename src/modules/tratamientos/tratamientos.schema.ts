import { z } from "zod";

export const createTratamientoSchema = z.object({
  id_consulta:    z.number().int().positive(),
  id_medicamento: z.number().int().positive(),
  dosis:          z.string().max(100).optional(),
  frecuencia:     z.string().max(100).optional(),
  duracion_dias:  z.number().int().positive().optional(),
  cantidad:       z.number().int().positive().optional(),
});

export const updateTratamientoSchema = createTratamientoSchema.omit({ id_consulta: true }).partial();

export type CreateTratamientoInput = z.infer<typeof createTratamientoSchema>;
export type UpdateTratamientoInput = z.infer<typeof updateTratamientoSchema>;
