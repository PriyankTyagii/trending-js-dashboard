import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchArticles } from "../services/api.js";
import ArticleCard from "../components/ArticleCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

const SORT_OPTIONS = [
  { label: "Most Reactions", value: "reactions" },
  { label: "Newest First", value: "newest" },
  { label: "Reading Time", value: "reading" },
];

export default function Articles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("reactions");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchArticles();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.user.name.toLowerCase().includes(search.toLowerCase()) ||
        a.tag_list.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );

    if (sortBy === "reactions")
      result.sort(
        (a, b) => b.positive_reactions_count - a.positive_reactions_count
      );
    if (sortBy === "newest")
      result.sort(
        (a, b) => new Date(b.published_at) - new Date(a.published_at)
      );
    if (sortBy === "reading")
      result.sort(
        (a, b) => a.reading_time_minutes - b.reading_time_minutes
      );

    return result;
  }, [articles, search, sortBy]);

  return (
    <div className="min-h-screen px-4 py-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/")}
          className="text-slate-400 hover:text-[#F7DF1E] transition-colors text-sm"
        >
          ← Back
        </button>
        <div>
          <h1 className="text-3xl font-bold text-[#F7DF1E]">
            📰 Trending JS Articles
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Hottest JavaScript articles from the Dev.to community
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by title, author or tag..."
        />
        <div className="flex gap-2 flex-wrap">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSortBy(opt.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                sortBy === opt.value
                  ? "bg-[#F7DF1E] text-[#1a1a2e] border-[#F7DF1E]"
                  : "bg-transparent text-slate-400 border-[#0f3460] hover:border-[#F7DF1E] hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-10 h-10 border-4 border-[#F7DF1E] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400">Fetching trending articles...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-xl p-6 text-center">
          <p className="text-red-400 font-medium">⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-sm text-[#F7DF1E] hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && filteredAndSorted.length === 0 && (
        <div className="text-center py-24 text-slate-400">
          No articles match your search.
        </div>
      )}

      {/* Results */}
      {!loading && !error && filteredAndSorted.length > 0 && (
        <>
          <p className="text-slate-500 text-sm mb-4">
            Showing {filteredAndSorted.length} of {articles.length} articles
          </p>
          <div className="grid gap-4">
            {filteredAndSorted.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}