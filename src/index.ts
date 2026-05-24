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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() as hora");
    res.json({
      mensaje: "✅ VetCore API corriendo",
      hora: result.rows[0].hora,
    });
  } catch (err) {
    res.status(500).json({ error: "❌ Error de conexión" });
  }
});

// Rutas API
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

// 404 global
app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
