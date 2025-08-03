// server.js - Main entry point for the backend
import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import submissionRoutes from "./routes/submissionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import Queue from "./models/Queue.js"; // Import Queue model
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/yabadoo";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "../frontend/dist")));
}

// Routes
app.use("/api/submissions", submissionRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Serve React app in production
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "../frontend/dist/index.html"));
  });
}

// Connect to MongoDB and start server
connect(MONGODB_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    // Initialize queue on server start (ensures queue document exists)
    try {
      await Queue.getQueue();
      console.log("Queue system initialized");
    } catch (error) {
      console.error("Error initializing queue:", error);
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

export default app;
