import pool from "../../db/pool";
import { UpdateVeterinarioInput } from "./veterinarios.schema";

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

export const createVeterinario = async (data: any) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const v = await client.query(
      "INSERT INTO veterinarios (cedula, nombres, apellidos, telefono, email, id_especialidad) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        data.cedula,
        data.nombres,
        data.apellidos,
        data.telefono,
        data.email,
        data.id_especialidad,
      ],
    );
    await client.query(
      "INSERT INTO usuarios (username, password_hash, rol) VALUES ($1, $2, 'VETERINARIO')",
      [data.username, data.password_hash],
    );
    await client.query("COMMIT");
    return v.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

export const updateVeterinario = async (
  id: number,
  data: UpdateVeterinarioInput,
) => {
  const entries = Object.entries(data).filter(([_, v]) => v !== undefined);
  if (entries.length === 0) return await getVeterinarioById(id);
  const fields = entries.map(([k], i) => `${k} = $${i + 2}`).join(", ");
  const values = entries.map(([_, v]) => v);
  const { rows } = await pool.query(
    `UPDATE veterinarios SET ${fields} WHERE id_veterinario = $1 RETURNING *`,
    [id, ...values],
  );
  return rows[0] || null;
};

export const deleteVeterinario = async (id: number) => {
  const { rows } = await pool.query(
    "UPDATE veterinarios SET activo = FALSE WHERE id_veterinario = $1 RETURNING *",
    [id],
  );
  return rows[0] || null;
};
