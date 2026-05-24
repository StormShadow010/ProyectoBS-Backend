import { z } from "zod";

export const createVeterinarioSchema = z.object({
  // Datos de Autenticación (Nuevos)
  username: z
    .string({ message: "El usuario es obligatorio" })
    .min(3, "Usuario muy corto")
    .trim(),
  password: z.string().min(6, "La contraseña debe tener mínimo 6 caracteres"),

  // Datos Profesionales
  cedula: z
    .string({ message: "La cédula es obligatoria" })
    .regex(/^\d{7,10}$/, "Cédula inválida")
    .trim(),
  nombres: z.string().min(2).max(100).trim(),
  apellidos: z.string().min(2).max(100).trim(),
  telefono: z.string().regex(/^\d+$/, "Solo números").optional(),
  email: z
    .string({ message: "El correo es obligatorio" })
    .email("Email inválido")
    .trim(),
  id_especialidad: z.number().int().positive().optional(),
  activo: z.boolean().optional(),
});

export const updateVeterinarioSchema = createVeterinarioSchema.partial();

export type CreateVeterinarioInput = z.infer<typeof createVeterinarioSchema>;
export type UpdateVeterinarioInput = z.infer<typeof updateVeterinarioSchema>;
