import express from "express";
import { fetchTrendingArticles } from "../services/devtoService.js";

const router = express.Router();

// GET /api/articles
router.get("/", async (req, res) => {
  try {
    const articles = await fetchTrendingArticles();
    res.json({ success: true, count: articles.length, data: articles });
  } catch (error) {
    console.error("Error in /api/articles:", error.message);
    res.status(502).json({
      success: false,
      error: "Failed to fetch articles from Dev.to",
    });
  }
});

export default router;