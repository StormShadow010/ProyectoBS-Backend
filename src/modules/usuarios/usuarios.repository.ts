import pool from "../../db/pool";
import bcrypt from "bcryptjs";
import { CreateUsuarioInput, UpdateUsuarioInput } from "./usuarios.schema";

export const getAllUsuarios = async () => {
  const { rows } = await pool.query(
    `SELECT u.id_usuario, u.username, u.email, u.rol, u.activo,
            u.id_veterinario,
            COALESCE(v.nombres || ' ' || v.apellidos, 'N/A') AS veterinario_nombre
     FROM usuarios u
     LEFT JOIN veterinarios v ON u.id_veterinario = v.id_veterinario
     ORDER BY 
       CASE u.rol
         WHEN 'SUPERADMIN' THEN 1
         WHEN 'ADMIN'      THEN 2
         WHEN 'USUARIO'    THEN 3
         WHEN 'CONSULTA'   THEN 4
         ELSE 5
       END ASC,
       u.username ASC`, // Orden alfabético secundario
  );
  return rows;
};

export const getUsuarioById = async (id: number) => {
  const { rows } = await pool.query(
    `SELECT u.id_usuario, u.username, u.email, u.rol, u.activo, u.creado_en, u.id_veterinario
     FROM usuarios u WHERE u.id_usuario = $1`,
    [id],
  );
  return rows[0] || null;
};

export const createUsuario = async (data: CreateUsuarioInput) => {
  const password_hash = await bcrypt.hash(data.password, 10);
  const { rows } = await pool.query(
    `INSERT INTO usuarios (username, email, password_hash, rol, id_veterinario, id_propietario)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING id_usuario, username, email, rol, activo, creado_en`,
    [
      data.username,
      data.email ?? null,
      password_hash,
      data.rol,
      data.id_veterinario ?? null,
      data.id_propietario ?? null,
    ],
  );
  return rows[0];
};

export const updateUsuario = async (id: number, data: UpdateUsuarioInput) => {
  const keys = Object.keys(data).filter((k) => (data as any)[k] !== undefined);
  if (keys.length === 0) return getUsuarioById(id);
  const fields = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as any)[k]);
  const { rows } = await pool.query(
    `UPDATE usuarios SET ${fields} WHERE id_usuario = $1
     RETURNING id_usuario, username, email, rol, activo`,
    [id, ...values],
  );
  return rows[0] || null;
};

export const deleteUsuario = async (id: number) => {
  const { rows } = await pool.query(
    `UPDATE usuarios SET activo = FALSE WHERE id_usuario = $1
     RETURNING id_usuario, username, rol, activo`,
    [id],
  );
  return rows[0] || null;
};
