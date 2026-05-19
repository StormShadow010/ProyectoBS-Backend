import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Usuario muy corto"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Usuario muy corto"),
  email: z.string().email("Email inválido").optional(),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  nombres: z.string().min(1, "El nombre es requerido"),
  apellidos: z.string().min(1, "Los apellidos son requeridos"),
  telefono: z.string().optional(),
  ciudad: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
