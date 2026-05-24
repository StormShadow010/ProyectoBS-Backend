import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import pool from "./db/pool";

import authRoutes from "./modules/auth/auth.routes";
import mascotasRoutes from "./modules/mascotas/mascotas.routes";
import especiesRoutes from "./modules/especies/especies.routes";
import propietariosRoutes from "./modules/propietarios/propietarios.routes";
import veterinariosRoutes from "./modules/veterinarios/veterinarios.routes";
import usuariosRoutes from "./modules/usuarios/usuarios.routes";
import citasRoutes from "./modules/citas/citas.routes";
import consultasRoutes from "./modules/consultas/consultas.routes";
import tratamientosRoutes from "./modules/tratamientos/tratamientos.routes";
import medicamentosRoutes from "./modules/medicamentos/medicamentos.routes";
import facturasRoutes from "./modules/facturas/facturas.routes";
import sqlRoutes from "./modules/sql/sql.routes";
import { errorHandler } from "./middleware/error.middleware";
import especialidadesRoutes from "./modules/especialidades/especialidades.routes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW() as hora");

    res.json({
      success: true,
      message: "✅ VetCore API corriendo",
      hora: result.rows[0].hora,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "❌ Error de conexión",
    });
  }
});

const API = "/api/v1";

app.use(`${API}/auth`, authRoutes);
app.use(`${API}/especies`, especiesRoutes);
app.use(`${API}/mascotas`, mascotasRoutes);
app.use(`${API}/propietarios`, propietariosRoutes);
app.use(`${API}/veterinarios`, veterinariosRoutes);
app.use(`${API}/usuarios`, usuariosRoutes);
app.use(`${API}/citas`, citasRoutes);
app.use(`${API}/consultas`, consultasRoutes);
app.use(`${API}/tratamientos`, tratamientosRoutes);
app.use(`${API}/medicamentos`, medicamentosRoutes);
app.use(`${API}/facturas`, facturasRoutes);
app.use(`${API}/sql`, sqlRoutes);
app.use(`${API}/especialidades`, especialidadesRoutes);

app.use((_req, res) => {
  return res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
