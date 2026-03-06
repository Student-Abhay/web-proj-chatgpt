import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();


// CREATE PRODUCT
router.post("/", authenticateToken, async (req, res) => {
  const { name, price, quantity } = req.body;
  const userId = req.user.userId;

  try {
    await pool.query(
      "INSERT INTO products (user_id, name, price, quantity) VALUES (?, ?, ?, ?)",
      [userId, name, price, quantity]
    );

    res.status(201).json({ message: "Product created" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


// GET ALL PRODUCTS FOR LOGGED USER
router.get("/", authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const [products] = await pool.query(
      "SELECT * FROM products WHERE user_id = ?",
      [userId]
    );

    res.json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


// UPDATE PRODUCT
router.put("/:id", authenticateToken, async (req, res) => {
  const { name, price, quantity } = req.body;
  const productId = req.params.id;
  const userId = req.user.userId;

  try {
    await pool.query(
      "UPDATE products SET name=?, price=?, quantity=? WHERE id=? AND user_id=?",
      [name, price, quantity, productId, userId]
    );

    res.json({ message: "Product updated" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


// DELETE PRODUCT
router.delete("/:id", authenticateToken, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.userId;

  try {
    await pool.query(
      "DELETE FROM products WHERE id=? AND user_id=?",
      [productId, userId]
    );

    res.json({ message: "Product deleted" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;