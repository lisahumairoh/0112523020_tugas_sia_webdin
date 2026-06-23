import { Router, Request, Response } from "express";
import db from "../config/database";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM mahasiswa ORDER BY id DESC"
    );

    res.json({
      message: "Data mahasiswa berhasil diambil dari database",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
});

export default router;
