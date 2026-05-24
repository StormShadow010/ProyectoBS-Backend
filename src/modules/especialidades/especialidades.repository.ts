import pool from "../../db/pool";

export const findAll = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM especialidades ORDER BY id_especialidad ASC",
  );
  return rows;
};

export const create = async (nombre: string, descripcion: string) => {
  const { rows } = await pool.query(
    "INSERT INTO especialidades (nombre, descripcion) VALUES ($1, $2) RETURNING *",
    [nombre, descripcion],
  );
  return rows[0];
};

export const update = async (
  id: number,
  nombre: string,
  descripcion: string,
) => {
  const { rows } = await pool.query(
    "UPDATE especialidades SET nombre = $1, descripcion = $2 WHERE id_especialidad = $3 RETURNING *",
    [nombre, descripcion, id],
  );
  return rows[0];
};

export const remove = async (id: number) => {
  await pool.query("DELETE FROM especialidades WHERE id_especialidad = $1", [
    id,
  ]);
};
