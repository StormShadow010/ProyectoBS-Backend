import pool from "../../db/pool";

export const getAllMascotas = async () => {
  const result = await pool.query(`
    SELECT 
      m.id_mascota,
      m.nombre,
      m.raza,
      m.sexo,
      m.fecha_nac,
      m.peso_kg,
      m.color,
      m.activa,
      e.nombre AS especie,
      p.nombres || ' ' || p.apellidos AS propietario,
      p.telefono AS telefono_propietario,
      p.id_propietario
    FROM mascotas m
    INNER JOIN especies e ON m.id_especie = e.id_especie
    INNER JOIN propietarios p ON m.id_propietario = p.id_propietario
    ORDER BY m.id_mascota
  `);
  return result.rows;
};

export const getMascotaById = async (id: number) => {
  const result = await pool.query(
    `
    SELECT 
      m.*,
      e.nombre AS especie,
      p.nombres || ' ' || p.apellidos AS propietario,
      p.telefono AS telefono_propietario
    FROM mascotas m
    INNER JOIN especies e ON m.id_especie = e.id_especie
    INNER JOIN propietarios p ON m.id_propietario = p.id_propietario
    WHERE m.id_mascota = $1
  `,
    [id],
  );
  return result.rows[0] || null;
};

export const createMascota = async (data: any) => {
  const result = await pool.query(
    `
    INSERT INTO mascotas (nombre, id_especie, raza, sexo, fecha_nac, peso_kg, color, id_propietario)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `,
    [
      data.nombre,
      data.id_especie,
      data.raza,
      data.sexo,
      data.fecha_nac,
      data.peso_kg,
      data.color,
      data.id_propietario,
    ],
  );
  return result.rows[0];
};

export const updateMascota = async (id: number, data: any) => {
  const result = await pool.query(
    `
    UPDATE mascotas
    SET nombre = $1, id_especie = $2, raza = $3, sexo = $4,
        fecha_nac = $5, peso_kg = $6, color = $7, id_propietario = $8
    WHERE id_mascota = $9
    RETURNING *
  `,
    [
      data.nombre,
      data.id_especie,
      data.raza,
      data.sexo,
      data.fecha_nac,
      data.peso_kg,
      data.color,
      data.id_propietario,
      id,
    ],
  );
  return result.rows[0] || null;
};

export const deleteMascota = async (id: number) => {
  const result = await pool.query(
    `
    UPDATE mascotas SET activa = FALSE WHERE id_mascota = $1 RETURNING *
  `,
    [id],
  );
  return result.rows[0] || null;
};
