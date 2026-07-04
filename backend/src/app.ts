import express from "express";
import cors from "cors";
import path from "path";
import mahasiswaRoutes from "./routes/mahasiswa.route";
import prodiRoutes from "./routes/prodi.route";
import authRoutes from "./routes/auth.route"; // 1. Import auth route
import { authMiddleware } from "./middlewares/auth.middleware"; /

const app = express();

app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Agar file di folder uploads bisa diakses oleh frontend
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/prodi", prodiRoutes);
app.use("/api/mahasiswa", mahasiswaRoutes);

// Daftarkan route auth (/api/auth/login, /api/auth/register)
app.use("/api/auth", authRoutes);

// 3. Pasang authMiddleware untuk melindungi route mahasiswa!
app.use("/api/mahasiswa", authMiddleware as any, mahasiswaRoutes);
app.use("/api/db/mahasiswa", authMiddleware as any, mahasiswaDbRoutes);

export default app;
