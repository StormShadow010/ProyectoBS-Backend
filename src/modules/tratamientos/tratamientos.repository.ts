import pool from "../../db/pool";
import { CreateTratamientoInput, UpdateTratamientoInput } from "./tratamientos.schema";

export const getTratamientosByConsulta = async (id_consulta: number) => {
  const { rows } = await pool.query(
    `SELECT t.*, med.nombre AS medicamento_nombre, med.presentacion
     FROM tratamientos t
     JOIN medicamentos med ON t.id_medicamento = med.id_medicamento
     WHERE t.id_consulta = $1`,
    [id_consulta]
  );
  return rows;
};

export const getAllTratamientos = async () => {
  const { rows } = await pool.query(`
    SELECT t.*, med.nombre AS medicamento_nombre,
           m.nombre AS mascota_nombre
    FROM tratamientos t
    JOIN medicamentos med ON t.id_medicamento = med.id_medicamento
    JOIN consultas    co  ON t.id_consulta    = co.id_consulta
    JOIN citas        ci  ON co.id_cita       = ci.id_cita
    JOIN mascotas     m   ON ci.id_mascota    = m.id_mascota
    ORDER BY t.id_tratamiento DESC
  `);
  return rows;
};

export const createTratamiento = async (data: CreateTratamientoInput) => {
  const { rows } = await pool.query(
    `INSERT INTO tratamientos (id_consulta, id_medicamento, dosis, frecuencia, duracion_dias, cantidad)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [data.id_consulta, data.id_medicamento, data.dosis ?? null,
     data.frecuencia ?? null, data.duracion_dias ?? null, data.cantidad ?? null]
  );
  // Descontar stock
  if (data.cantidad) {
    await pool.query(
      `UPDATE medicamentos SET stock = stock - $2 WHERE id_medicamento = $1 AND stock >= $2`,
      [data.id_medicamento, data.cantidad]
    );
  }
  return rows[0];
};

export const deleteTratamiento = async (id: number) => {
  const { rows } = await pool.query(
    `DELETE FROM tratamientos WHERE id_tratamiento = $1 RETURNING *`,
    [id]
  );
  return rows[0] || null;
};
