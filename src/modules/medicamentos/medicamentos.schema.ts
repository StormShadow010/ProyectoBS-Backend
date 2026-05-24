import { z } from "zod";

export const createMedicamentoSchema = z.object({
  nombre:        z.string().min(2).max(150),
  principio_act: z.string().max(150).optional(),
  presentacion:  z.string().max(80).optional(),
  stock:         z.number().int().min(0).default(0),
  precio_unit:   z.number().min(0).default(0),
  activo:        z.boolean().optional(),
});

export const updateMedicamentoSchema = createMedicamentoSchema.partial();
export const ajustarStockSchema = z.object({ cantidad: z.number().int() });

export type CreateMedicamentoInput = z.infer<typeof createMedicamentoSchema>;
export type UpdateMedicamentoInput = z.infer<typeof updateMedicamentoSchema>;
