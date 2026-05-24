import pool from "../../db/pool";
import { CreateMedicamentoInput, UpdateMedicamentoInput } from "./medicamentos.schema";

export const getAllMedicamentos = async () => {
  const { rows } = await pool.query(`SELECT * FROM medicamentos ORDER BY nombre`);
  return rows;
};

export const getMedicamentoById = async (id: number) => {
  const { rows } = await pool.query(`SELECT * FROM medicamentos WHERE id_medicamento = $1`, [id]);
  return rows[0] || null;
};

export const createMedicamento = async (data: CreateMedicamentoInput) => {
  const { rows } = await pool.query(
    `INSERT INTO medicamentos (nombre, principio_act, presentacion, stock, precio_unit)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [data.nombre, data.principio_act ?? null, data.presentacion ?? null, data.stock, data.precio_unit]
  );
  return rows[0];
};

export const updateMedicamento = async (id: number, data: UpdateMedicamentoInput) => {
  const keys = Object.keys(data).filter((k) => (data as any)[k] !== undefined);
  if (keys.length === 0) return getMedicamentoById(id);
  const fields = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as any)[k]);
  const { rows } = await pool.query(
    `UPDATE medicamentos SET ${fields} WHERE id_medicamento = $1 RETURNING *`,
    [id, ...values]
  );
  return rows[0] || null;
};

export const ajustarStock = async (id: number, cantidad: number) => {
  const { rows } = await pool.query(
    `UPDATE medicamentos SET stock = stock + $2
     WHERE id_medicamento = $1 AND stock + $2 >= 0 RETURNING *`,
    [id, cantidad]
  );
  return rows[0] || null;
};

export const deleteMedicamento = async (id: number) => {
  const { rows } = await pool.query(
    `UPDATE medicamentos SET activo = FALSE WHERE id_medicamento = $1 RETURNING *`,
    [id]
  );
  return rows[0] || null;
};
