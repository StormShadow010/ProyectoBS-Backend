import { z } from "zod";

const estadoEnum = z.enum(["PENDIENTE", "ATENDIDA", "CANCELADA", "NO_ASISTIO"]);

export const createCitaSchema = z.object({
  id_mascota:     z.number().int().positive(),
  id_veterinario: z.number().int().positive(),
  fecha_hora:     z.string().min(1, "Fecha requerida"),
  motivo:         z.string().max(200).optional(),
  estado:         estadoEnum.optional().default("PENDIENTE"),
  observaciones:  z.string().max(500).optional(),
});

export const updateCitaSchema = createCitaSchema.partial();

export type CreateCitaInput = z.infer<typeof createCitaSchema>;
export type UpdateCitaInput = z.infer<typeof updateCitaSchema>;
