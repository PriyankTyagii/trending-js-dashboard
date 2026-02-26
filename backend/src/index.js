import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reposRouter from "./routes/repos.js";
import articlesRouter from "./routes/articles.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://trending-js-frontend.onrender.com"
  ]
}));

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Trending JS Dashboard API is running" });
});

// Routes
app.use("/api/repos", reposRouter);
app.use("/api/articles", articlesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});