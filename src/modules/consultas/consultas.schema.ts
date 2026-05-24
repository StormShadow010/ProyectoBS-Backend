import { z } from "zod";

export const createConsultaSchema = z.object({
  id_cita:        z.number().int().positive(),
  diagnostico:    z.string().max(500).optional(),
  sintomas:       z.string().max(500).optional(),
  temperatura:    z.number().optional(),
  peso_consulta:  z.number().optional(),
  proxima_cita:   z.string().optional(),
  costo_consulta: z.number().min(0).default(0),
});

export const updateConsultaSchema = createConsultaSchema.omit({ id_cita: true }).partial();

export type CreateConsultaInput = z.infer<typeof createConsultaSchema>;
export type UpdateConsultaInput = z.infer<typeof updateConsultaSchema>;
