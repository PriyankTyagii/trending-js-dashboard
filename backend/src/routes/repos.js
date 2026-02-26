import express from "express";
import { fetchTrendingRepos } from "../services/githubService.js";

const router = express.Router();

// GET /api/repos
router.get("/", async (req, res) => {
  try {
    const repos = await fetchTrendingRepos();
    res.json({ success: true, count: repos.length, data: repos });
  } catch (error) {
    console.error("Error in /api/repos:", error.message);
    res.status(502).json({
      success: false,
      error: "Failed to fetch repositories from GitHub",
    });
  }
});

export default router;