import { z } from "zod";

export const createEspecieSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
});

export const updateEspecieSchema = createEspecieSchema.partial();

export type CreateEspecieInput = z.infer<typeof createEspecieSchema>;
export type UpdateEspecieInput = z.infer<typeof updateEspecieSchema>;
