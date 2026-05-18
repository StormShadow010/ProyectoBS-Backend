export type Rol = "SUPERADMIN" | "ADMIN" | "USUARIO" | "CONSULTA";

export interface JwtPayload {
  id: number;
  email: string;
  rol: Rol;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
