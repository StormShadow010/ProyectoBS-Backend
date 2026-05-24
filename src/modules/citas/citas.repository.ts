import pool from "../../db/pool";
import { CreateCitaInput, UpdateCitaInput } from "./citas.schema";

export const getAllCitas = async () => {
  const { rows } = await pool.query(`
    SELECT c.*,
           m.nombre  AS mascota_nombre,
           p.nombres || ' ' || p.apellidos AS propietario_nombre,
           v.nombres || ' ' || v.apellidos AS veterinario_nombre,
           e.nombre  AS especialidad_nombre
    FROM citas c
    JOIN mascotas    m ON c.id_mascota     = m.id_mascota
    JOIN propietarios p ON m.id_propietario = p.id_propietario
    JOIN veterinarios v ON c.id_veterinario  = v.id_veterinario
    LEFT JOIN especialidades e ON v.id_especialidad = e.id_especialidad
    ORDER BY c.fecha_hora DESC
  `);
  return rows;
};

export const getCitaById = async (id: number) => {
  const { rows } = await pool.query(
    `SELECT c.*,
            m.nombre  AS mascota_nombre,
            p.nombres || ' ' || p.apellidos AS propietario_nombre,
            v.nombres || ' ' || v.apellidos AS veterinario_nombre
     FROM citas c
     JOIN mascotas    m ON c.id_mascota     = m.id_mascota
     JOIN propietarios p ON m.id_propietario = p.id_propietario
     JOIN veterinarios v ON c.id_veterinario  = v.id_veterinario
     WHERE c.id_cita = $1`,
    [id]
  );
  return rows[0] || null;
};

export const getCitasByMascota = async (id_mascota: number) => {
  const { rows } = await pool.query(
    `SELECT c.*, v.nombres || ' ' || v.apellidos AS veterinario_nombre
     FROM citas c
     JOIN veterinarios v ON c.id_veterinario = v.id_veterinario
     WHERE c.id_mascota = $1 ORDER BY c.fecha_hora DESC`,
    [id_mascota]
  );
  return rows;
};

export const createCita = async (data: CreateCitaInput) => {
  const { rows } = await pool.query(
    `INSERT INTO citas (id_mascota, id_veterinario, fecha_hora, motivo, estado, observaciones)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [data.id_mascota, data.id_veterinario, data.fecha_hora,
     data.motivo ?? null, data.estado ?? "PENDIENTE", data.observaciones ?? null]
  );
  return rows[0];
};

export const updateCita = async (id: number, data: UpdateCitaInput) => {
  const keys = Object.keys(data).filter((k) => (data as any)[k] !== undefined);
  if (keys.length === 0) return getCitaById(id);
  const fields = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as any)[k]);
  const { rows } = await pool.query(
    `UPDATE citas SET ${fields} WHERE id_cita = $1 RETURNING *`,
    [id, ...values]
  );
  return rows[0] || null;
};

export const deleteCita = async (id: number) => {
  const { rows } = await pool.query(
    `UPDATE citas SET estado = 'CANCELADA' WHERE id_cita = $1 RETURNING *`,
    [id]
  );
  return rows[0] || null;
};
