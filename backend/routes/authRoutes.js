import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Hardcoded admin credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@yabadoo.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password123";

router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password match
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign({ isAdmin: true, email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

router.get("/verify", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ valid: false });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
});

export default router;
