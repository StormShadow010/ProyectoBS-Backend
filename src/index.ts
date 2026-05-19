import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db/pool";
import authRoutes from "./modules/auth/auth.routes";
import mascotasRoutes from "./modules/mascotas/mascotas.routes";
import especiesRoutes from "./modules/especies/especies.routes";
import propietariosRoutes from "./modules/propietarios/propietarios.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/mascotas", mascotasRoutes);
app.use("/api/especies", especiesRoutes);
app.use("/api/propietarios", propietariosRoutes);

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

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
