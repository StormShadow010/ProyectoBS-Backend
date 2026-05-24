import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Usuario muy corto"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const registerSchema = z.object({
  username: z
    .string({ message: "El usuario es obligatorio" })
    .min(3, "Usuario muy corto")
    .trim(),
  email: z
    .string({ message: "El correo es obligatorio" })
    .email("Por favor, ingresa un correo electrónico válido")
    .trim(),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  cedula: z
    .string({ message: "La cédula de ciudadanía es obligatoria" })
    .regex(/^\d{7,10}$/, "La cédula debe ser un número válido")
    .trim(),
  nombres: z.string().min(1, "El nombre es requerido").trim(),
  apellidos: z.string().min(1, "Los apellidos son requeridos").trim(),
  telefono: z
    .string()
    .regex(/^\d+$/, "El teléfono solo debe contener números")
    .optional(),
  direccion: z.string().optional(), // <-- Nuevo campo mapeado en Zod
  ciudad: z.string().min(1, "La ciudad es requerida").trim(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
