import pool from "../../db/pool";
import {
  CreateVeterinarioInput,
  UpdateVeterinarioInput,
} from "./veterinarios.schema";

export const getAllVeterinarios = async () => {
  const { rows } = await pool.query(`
    SELECT v.*, e.nombre AS especialidad_nombre
    FROM veterinarios v
    LEFT JOIN especialidades e ON v.id_especialidad = e.id_especialidad
    ORDER BY v.id_veterinario
  `);
  return rows;
};

export const getVeterinarioById = async (id: number) => {
  const { rows } = await pool.query(
    `SELECT v.*, e.nombre AS especialidad_nombre
     FROM veterinarios v
     LEFT JOIN especialidades e ON v.id_especialidad = e.id_especialidad
     WHERE v.id_veterinario = $1`,
    [id],
  );
  return rows[0] || null;
};

// Modificado: Recibe la data completa más el hash de la contraseña
export const createVeterinario = async (
  data: CreateVeterinarioInput & { password_hash: string },
) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Validar que la cédula o el username no existan
    const checkExist = await client.query(
      "SELECT id_veterinario FROM veterinarios WHERE cedula = $1 OR email = $2",
      [data.cedula, data.email],
    );
    if (checkExist.rows.length > 0)
      throw new Error("La cédula o el correo ya existen en el sistema.");

    // 2. Insertar en la tabla de veterinarios
    const { rows } = await client.query(
      `INSERT INTO veterinarios (cedula, nombres, apellidos, telefono, email, id_especialidad)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        data.cedula,
        data.nombres,
        data.apellidos,
        data.telefono || null,
        data.email,
        data.id_especialidad || null,
      ],
    );
    const nuevoVeterinario = rows[0];

    // 3. Crear el acceso en la tabla usuarios vinculando el id_veterinario (o la columna de relación que uses)
    // Nota: Asegúrate de que tu tabla 'usuarios' tenga la columna id_veterinario si aplica, o se mapee según tu DER.
    await client.query(
      `INSERT INTO usuarios (username, email, password_hash, rol, activo, creado_en)
       VALUES ($1, $2, $3, 'VETERINARIO', true, NOW())`,
      [data.username, data.email, data.password_hash],
    );

    await client.query("COMMIT");
    return nuevoVeterinario;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const updateVeterinario = async (
  id: number,
  data: UpdateVeterinarioInput,
) => {
  const keys = Object.keys(data).filter((k) => (data as any)[k] !== undefined);
  if (keys.length === 0) return getVeterinarioById(id);
  const fields = keys.map((k, i) => `${k} = $${i + 2}`).join(", ");
  const values = keys.map((k) => (data as any)[k]);
  const { rows } = await pool.query(
    `UPDATE veterinarios SET ${fields} WHERE id_veterinario = $1 RETURNING *`,
    [id, ...values],
  );
  return rows[0] || null;
};

export const deleteVeterinario = async (id: number) => {
  const { rows } = await pool.query(
    `UPDATE veterinarios SET activo = FALSE WHERE id_veterinario = $1 RETURNING *`,
    [id],
  );
  return rows[0] || null;
};
