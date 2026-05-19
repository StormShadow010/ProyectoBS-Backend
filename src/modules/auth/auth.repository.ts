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
    "SELECT id_usuario, username, email, rol, id_propietario FROM usuarios WHERE id_usuario = $1",
    [id],
  );
  return result.rows[0] || null;
};

export const createUser = async (
  data: RegisterInput & { password_hash: string },
) => {
  // Usar transacción para crear propietario y usuario juntos
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1 — Crear propietario
    const propietarioRes = await client.query(
      `INSERT INTO propietarios (cedula, nombres, apellidos, telefono, ciudad)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING id_propietario`,
      [
        `USR-${Date.now()}`, // cédula temporal única
        data.nombres,
        data.apellidos,
        data.telefono || null,
        data.ciudad || null,
      ],
    );
    const id_propietario = propietarioRes.rows[0].id_propietario;

    // 2 — Crear usuario vinculado al propietario
    const usuarioRes = await client.query(
      `INSERT INTO usuarios (username, email, password_hash, rol, id_propietario)
       VALUES ($1, $2, $3, 'USUARIO', $4)
       RETURNING id_usuario, username, email, rol, id_propietario`,
      [data.username, data.email, data.password_hash, id_propietario],
    );

    await client.query("COMMIT");
    return usuarioRes.rows[0];
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
