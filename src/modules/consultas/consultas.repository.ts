import pool from "../../db/pool";
import { CreateConsultaInput, UpdateConsultaInput } from "./consultas.schema";

export const getAllConsultas = async () => {
  const { rows } = await pool.query(`
    SELECT co.*,
           ci.fecha_hora, ci.motivo, ci.estado,
           m.nombre  AS mascota_nombre,
           p.nombres || ' ' || p.apellidos AS propietario_nombre,
           v.nombres || ' ' || v.apellidos AS veterinario_nombre
    FROM consultas co
    JOIN citas       ci ON co.id_cita        = ci.id_cita
    JOIN mascotas    m  ON ci.id_mascota     = m.id_mascota
    JOIN propietarios p ON m.id_propietario  = p.id_propietario
    JOIN veterinarios v ON ci.id_veterinario = v.id_veterinario
    ORDER BY co.id_consulta DESC
  `);
  return rows;
};

export const getConsultaById = async (id: number) => {
  const { rows } = await pool.query(
    `SELECT co.*,
            ci.fecha_hora, ci.motivo,
            m.nombre  AS mascota_nombre,
            v.nombres || ' ' || v.apellidos AS veterinario_nombre
     FROM consultas co
     JOIN citas       ci ON co.id_cita        = ci.id_cita
     JOIN mascotas    m  ON ci.id_mascota     = m.id_mascota
     JOIN veterinarios v ON ci.id_veterinario = v.id_veterinario
     WHERE co.id_consulta = $1`,
    [id]
  );
  return rows[0] || null;
};

export const createConsulta = async (data: CreateConsultaInput) => {
  const { rows } = await pool.query(
    `INSERT INTO consultas (id_cita, diagnostico, sintomas, temperatura, peso_consulta, proxima_cita, costo_consulta)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [data.id_cita, data.diagnostico ?? null, data.sintomas ?? null,
     data.temperatura ?? null, data.peso_consulta ?? null,
     data.proxima_cita ?? null, data.costo_consulta]
  );
  // Actualizar estado de la cita a ATENDIDA
  await pool.query(`UPDATE citas SET estado = 'ATENDIDA' WHERE id_cita = $1`, [data.id_cita]);
  return rows[0];
};

export const updateConsulta = async (id: number, data: UpdateConsultaInput) => {
  const keys = Object.keys(data).filter((k) => (data as any)[k] !== undefined);
  if (keys.length === 0) return getConsultaById(id);
  const fields = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as any)[k]);
  const { rows } = await pool.query(
    `UPDATE consultas SET ${fields} WHERE id_consulta = $1 RETURNING *`,
    [id, ...values]
  );
  return rows[0] || null;
};
