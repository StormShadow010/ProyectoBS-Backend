import { z } from "zod";

export const createUsuarioSchema = z.object({
  username: z.string().min(3).max(60),
  email: z.email().optional(),
  password: z.string().min(6),
  rol: z
    .enum(["SUPERADMIN", "ADMIN", "USUARIO", "CONSULTA"])
    .default("USUARIO"),
  id_veterinario: z.number().int().positive().optional(),
  id_propietario: z.number().int().positive().optional(),
});

export const updateUsuarioSchema = z.object({
  email: z.email().optional(),
  rol: z.enum(["SUPERADMIN", "ADMIN", "USUARIO", "CONSULTA"]).optional(),
  id_veterinario: z.number().int().positive().nullable().optional(),
  activo: z.boolean().optional(),
});

export type CreateUsuarioInput = z.infer<typeof createUsuarioSchema>;
export type UpdateUsuarioInput = z.infer<typeof updateUsuarioSchema>;
