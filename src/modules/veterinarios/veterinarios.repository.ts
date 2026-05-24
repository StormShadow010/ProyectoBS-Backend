import pool from "../../db/pool";
import { CreateVeterinarioInput, UpdateVeterinarioInput } from "./veterinarios.schema";

export const getAllVeterinarios = async () => {
  const { rows } = await pool.query(`
    SELECT v.*, e.nombre AS especialidad_nombre
    FROM veterinarios v
    LEFT JOIN especialidades e ON v.id_especialidad = e.id_especialidad
    ORDER BY v.id_veterinario
  `);
  return rows;
};

export const getVeterinarioById = async (id: number) => {
  const { rows } = await pool.query(
    `SELECT v.*, e.nombre AS especialidad_nombre
     FROM veterinarios v
     LEFT JOIN especialidades e ON v.id_especialidad = e.id_especialidad
     WHERE v.id_veterinario = $1`,
    [id]
  );
  return rows[0] || null;
};

export const createVeterinario = async (data: CreateVeterinarioInput) => {
  const { rows } = await pool.query(
    `INSERT INTO veterinarios (cedula, nombres, apellidos, telefono, email, id_especialidad)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [data.cedula, data.nombres, data.apellidos, data.telefono ?? null, data.email, data.id_especialidad ?? null]
  );
  return rows[0];
};

export const updateVeterinario = async (id: number, data: UpdateVeterinarioInput) => {
  const keys = Object.keys(data).filter((k) => (data as any)[k] !== undefined);
  if (keys.length === 0) return getVeterinarioById(id);
  const fields = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as any)[k]);
  const { rows } = await pool.query(
    `UPDATE veterinarios SET ${fields} WHERE id_veterinario = $1 RETURNING *`,
    [id, ...values]
  );
  return rows[0] || null;
};

export const deleteVeterinario = async (id: number) => {
  const { rows } = await pool.query(
    `UPDATE veterinarios SET activo = FALSE WHERE id_veterinario = $1 RETURNING *`,
    [id]
  );
  return rows[0] || null;
};
