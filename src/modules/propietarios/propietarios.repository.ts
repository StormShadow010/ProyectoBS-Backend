import pool from "../../db/pool";

export const getAllPropietarios = async () => {
  const result = await pool.query(
    "SELECT * FROM propietarios ORDER BY id_propietario",
  );
  return result.rows;
};

export const getPropietarioById = async (id: number) => {
  const result = await pool.query(
    `SELECT p.*, COUNT(m.id_mascota) AS total_mascotas
     FROM propietarios p
     LEFT JOIN mascotas m ON p.id_propietario = m.id_propietario
     WHERE p.id_propietario = $1
     GROUP BY p.id_propietario`,
    [id],
  );
  return result.rows[0] || null;
};

export const createPropietario = async (data: any) => {
  const result = await pool.query(
    `INSERT INTO propietarios (cedula, nombres, apellidos, telefono, email, direccion, ciudad)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      data.cedula,
      data.nombres,
      data.apellidos,
      data.telefono,
      data.email,
      data.direccion,
      data.ciudad,
    ],
  );
  return result.rows[0];
};

export const updatePropietario = async (id: number, data: any) => {
  const result = await pool.query(
    `UPDATE propietarios
     SET cedula = $1, nombres = $2, apellidos = $3,
         telefono = $4, email = $5, direccion = $6, ciudad = $7
     WHERE id_propietario = $8
     RETURNING *`,
    [
      data.cedula,
      data.nombres,
      data.apellidos,
      data.telefono,
      data.email,
      data.direccion,
      data.ciudad,
      id,
    ],
  );
  return result.rows[0] || null;
};

export const deletePropietario = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM propietarios WHERE id_propietario = $1 RETURNING *",
    [id],
  );
  return result.rows[0] || null;
};
