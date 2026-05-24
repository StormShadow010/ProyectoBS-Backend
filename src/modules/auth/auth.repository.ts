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
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Validación de seguridad extra: Evitar duplicidad de cédula en la BD
    const checkCedula = await client.query(
      "SELECT id_propietario FROM propietarios WHERE cedula = $1",
      [data.cedula],
    );

    if (checkCedula.rows.length > 0) {
      throw new Error("La cédula de ciudadanía ya se encuentra registrada");
    }

    // 2 — Crear propietario usando la cédula colombiana real enviada por el input
    const propietarioRes = await client.query(
      `INSERT INTO propietarios (cedula, nombres, apellidos, telefono, ciudad)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id_propietario`,
      [
        data.cedula, // <-- Reemplazado el timestamp por la cédula real
        data.nombres,
        data.apellidos,
        data.telefono || null,
        data.ciudad || null,
      ],
    );
    const id_propietario = propietarioRes.rows[0].id_propietario;

    // 3 — Crear usuario vinculado al propietario correspondiente
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
