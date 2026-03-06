import authRoutes from "./routes/auth.js";
import pool from "./db.js";
import productRoutes from "./routes/products.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://web-proj-chatgpt.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/test-db", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ message: "Database connection successful!" });
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ message: "Database connection failed!" });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});