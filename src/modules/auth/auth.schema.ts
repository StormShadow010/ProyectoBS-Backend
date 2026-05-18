import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Usuario muy corto"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const registerSchema = z.object({
  nombre: z.string().min(2, "Nombre muy corto"),
  username: z.string().min(3, "Usuario muy corto"),
  email: z.string().email("Email inválido").optional(),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  rol: z
    .enum(["SUPERADMIN", "ADMIN", "USUARIO", "CONSULTA"])
    .default("USUARIO"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
