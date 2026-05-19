import { z } from "zod";

export const createMascotaSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  id_especie: z.number(),
  raza: z.string().optional(),
  sexo: z.enum(["M", "F"]),
  fecha_nac: z.string().optional(),
  peso_kg: z.number().optional(),
  color: z.string().optional(),
  id_propietario: z.number(),
});

export const updateMascotaSchema = createMascotaSchema.partial();

export type CreateMascotaInput = z.infer<typeof createMascotaSchema>;
export type UpdateMascotaInput = z.infer<typeof updateMascotaSchema>;
