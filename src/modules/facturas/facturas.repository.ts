import pool from "../../db/pool";
import { CreateFacturaInput, UpdateFacturaInput } from "./facturas.schema";

export const getAllFacturas = async () => {
  const { rows } = await pool.query(`
    SELECT f.*,
           m.nombre  AS mascota_nombre,
           p.nombres || ' ' || p.apellidos AS propietario_nombre,
           ci.fecha_hora, ci.motivo
    FROM facturas f
    JOIN citas       ci ON f.id_cita         = ci.id_cita
    JOIN mascotas    m  ON ci.id_mascota     = m.id_mascota
    JOIN propietarios p ON m.id_propietario  = p.id_propietario
    ORDER BY f.fecha_emision DESC
  `);
  return rows;
};

export const getFacturaById = async (id: number) => {
  const { rows } = await pool.query(
    `SELECT f.*, m.nombre AS mascota_nombre,
            p.nombres || ' ' || p.apellidos AS propietario_nombre
     FROM facturas f
     JOIN citas       ci ON f.id_cita        = ci.id_cita
     JOIN mascotas    m  ON ci.id_mascota    = m.id_mascota
     JOIN propietarios p ON m.id_propietario = p.id_propietario
     WHERE f.id_factura = $1`,
    [id]
  );
  return rows[0] || null;
};

export const createFactura = async (data: CreateFacturaInput) => {
  const { rows } = await pool.query(
    `INSERT INTO facturas (id_cita, subtotal, descuento_pct, total, pagado, metodo_pago)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [data.id_cita, data.subtotal, data.descuento_pct, data.total,
     data.pagado, data.metodo_pago ?? null]
  );
  return rows[0];
};

export const updateFactura = async (id: number, data: UpdateFacturaInput) => {
  const keys = Object.keys(data).filter((k) => (data as any)[k] !== undefined);
  if (keys.length === 0) return getFacturaById(id);
  const fields = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as any)[k]);
  const { rows } = await pool.query(
    `UPDATE facturas SET ${fields} WHERE id_factura = $1 RETURNING *`,
    [id, ...values]
  );
  return rows[0] || null;
};
