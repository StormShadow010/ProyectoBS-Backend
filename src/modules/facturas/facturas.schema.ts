import { z } from "zod";

export const createFacturaSchema = z.object({
  id_cita:      z.number().int().positive(),
  subtotal:     z.number().min(0),
  descuento_pct: z.number().min(0).max(100).default(0),
  total:        z.number().min(0),
  pagado:       z.boolean().default(false),
  metodo_pago:  z.enum(["EFECTIVO","TARJETA","TRANSFERENCIA","NEQUI"]).optional(),
});

export const updateFacturaSchema = createFacturaSchema.omit({ id_cita: true }).partial();

export type CreateFacturaInput = z.infer<typeof createFacturaSchema>;
export type UpdateFacturaInput = z.infer<typeof updateFacturaSchema>;
