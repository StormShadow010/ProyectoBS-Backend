import pool from "../../db/pool";
import {
  CreateVeterinarioInput,
  UpdateVeterinarioInput,
} from "./veterinarios.schema";

export const getAllVeterinarios = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM veterinarios ORDER BY id_veterinario",
  );
  return rows;
};

export const getVeterinarioById = async (id: number) => {
  const { rows } = await pool.query(
    "SELECT * FROM veterinarios WHERE id_veterinario = $1",
    [id],
  );
  return rows[0] || null;
};

export const createVeterinario = async (
  data: CreateVeterinarioInput & { username: string; password_hash: string },
) => {
  const { rows } = await pool.query(
    `INSERT INTO veterinarios
      (cedula, nombres, apellidos, email, telefono, id_especialidad, activo, username, password_hash)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [
      data.cedula,
      data.nombres,
      data.apellidos,
      data.email,
      data.telefono ?? "",
      data.id_especialidad ?? null,
      data.activo ?? true,
      data.username,
      data.password_hash,
    ],
  );
  return rows[0];
};

export const updateVeterinario = async (
  id: number,
  data: UpdateVeterinarioInput,
) => {
  const fields = Object.keys(data) as (keyof UpdateVeterinarioInput)[];
  if (fields.length === 0) return getVeterinarioById(id);

  const setClause = fields.map((key, i) => `${key} = $${i + 1}`).join(", ");
  const values = fields.map((key) => data[key]);

  const { rows } = await pool.query(
    `UPDATE veterinarios
     SET ${setClause}
     WHERE id_veterinario = $${fields.length + 1}
     RETURNING *`,
    [...values, id],
  );
  return rows[0] || null;
};

export const deleteVeterinario = async (id: number) => {
  const { rows } = await pool.query(
    `UPDATE veterinarios
     SET activo = false
     WHERE id_veterinario = $1
     RETURNING *`,
    [id],
  );
  return rows[0] || null;
};
