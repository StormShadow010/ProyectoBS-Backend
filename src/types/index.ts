export type Rol = "SUPERADMIN" | "ADMIN" | "USUARIO" | "CONSULTA";

export interface JwtPayload {
  id_usuario: number;
  username: string;
  rol: Rol;
}
