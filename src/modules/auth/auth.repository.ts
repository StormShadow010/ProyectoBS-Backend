import pool from "../../db/pool";
import { RegisterInput } from "./auth.schema";

export const findUserByUsername = async (username: string) => {
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE username = $1",
    [username],
  );
  return result.rows[0] || null;
};

export const findUserById = async (id: number) => {
  const result = await pool.query(
    "SELECT id_usuario, username, email, rol FROM usuarios WHERE id_usuario = $1",
    [id],
  );
  return result.rows[0] || null;
};

export const createUser = async (
  data: RegisterInput & { password_hash: string },
) => {
  const result = await pool.query(
    `INSERT INTO usuarios (username, email, password_hash, rol)
     VALUES ($1, $2, $3, $4)
     RETURNING id_usuario, username, email, rol`,
    [data.username, data.email, data.password_hash, data.rol],
  );
  return result.rows[0];
};
