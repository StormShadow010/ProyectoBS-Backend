import { Router, Request, Response } from "express";
import pool from "../../db/pool";
import { authenticate, authorize } from "../../middleware/auth.middleware";
import { ok, fail } from "../../utils/response";

const router = Router();

// Autenticación obligatoria
router.use(authenticate);

// Solo SUPERADMIN y CONSULTA
router.use(authorize("SUPERADMIN", "CONSULTA"));

// Palabras peligrosas bloqueadas para CONSULTA
const DDL_KEYWORDS = [
  "DROP",
  "TRUNCATE",
  "ALTER",
  "CREATE",
  "INSERT",
  "UPDATE",
  "DELETE",
  "GRANT",
  "REVOKE",
];

router.post("/", async (req: Request, res: Response) => {
  const { query } = req.body as { query?: string };

  if (!query || typeof query !== "string" || query.trim().length === 0) {
    return fail(res, "Se requiere una consulta SQL", 400);
  }

  const user = (req as any).user;
  const upperQuery = query.trim().toUpperCase();

  // El rol CONSULTA solo puede ejecutar SELECT
  if (user.rol === "CONSULTA") {
    const hasDDL = DDL_KEYWORDS.some((kw) => upperQuery.includes(kw));

    if (hasDDL || !upperQuery.startsWith("SELECT")) {
      return fail(
        res,
        "El rol CONSULTA solo puede ejecutar consultas SELECT",
        403,
      );
    }
  }

  try {
    const result = await pool.query(query);

    return ok(
      res,
      {
        rows: result.rows,
        rowCount: result.rowCount,
        fields: result.fields?.map((f) => ({
          name: f.name,
          dataTypeID: f.dataTypeID,
        })),
      },
      `Consulta ejecutada — ${result.rowCount ?? 0} fila(s)`,
    );
  } catch (e: any) {
    return fail(res, e.message ?? "Error al ejecutar la consulta", 400);
  }
});

export default router;
