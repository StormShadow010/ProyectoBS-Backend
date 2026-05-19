import pool from "../../db/pool";

export const getAllEspecies = async () => {
  const result = await pool.query("SELECT * FROM especies ORDER BY id_especie");
  return result.rows;
};

export const getEspecieById = async (id: number) => {
  const result = await pool.query(
    "SELECT * FROM especies WHERE id_especie = $1",
    [id],
  );
  return result.rows[0] || null;
};

export const createEspecie = async (data: any) => {
  const result = await pool.query(
    `INSERT INTO especies (nombre, descripcion)
     VALUES ($1, $2)
     RETURNING *`,
    [data.nombre, data.descripcion],
  );
  return result.rows[0];
};

export const updateEspecie = async (id: number, data: any) => {
  const result = await pool.query(
    `UPDATE especies SET nombre = $1, descripcion = $2
     WHERE id_especie = $3
     RETURNING *`,
    [data.nombre, data.descripcion, id],
  );
  return result.rows[0] || null;
};

export const deleteEspecie = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM especies WHERE id_especie = $1 RETURNING *",
    [id],
  );
  return result.rows[0] || null;
};
