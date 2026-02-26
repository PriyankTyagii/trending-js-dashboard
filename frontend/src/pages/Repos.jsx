import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRepos } from "../services/api.js";
import RepoCard from "../components/RepoCard.jsx";
import SearchBar from "../components/SearchBar.jsx";

const SORT_OPTIONS = [
  { label: "Most Stars", value: "stars" },
  { label: "Most Forks", value: "forks" },
  { label: "Recently Updated", value: "updated" },
];

export default function Repos() {
  const navigate = useNavigate();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("stars");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchRepos();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = repos.filter(
      (r) =>
        r.full_name.toLowerCase().includes(search.toLowerCase()) ||
        (r.description || "").toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "stars")
      result.sort((a, b) => b.stargazers_count - a.stargazers_count);
    if (sortBy === "forks")
      result.sort((a, b) => b.forks_count - a.forks_count);
    if (sortBy === "updated")
      result.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    return result;
  }, [repos, search, sortBy]);

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
            🌟 Trending JS Repos
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Top JavaScript repositories on GitHub by star count
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search repositories..."
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
          <p className="text-slate-400">Fetching trending repos...</p>
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
          No repositories match your search.
        </div>
      )}

      {/* Results */}
      {!loading && !error && filteredAndSorted.length > 0 && (
        <>
          <p className="text-slate-500 text-sm mb-4">
            Showing {filteredAndSorted.length} of {repos.length} repositories
          </p>
          <div className="grid gap-4">
            {filteredAndSorted.map((repo, index) => (
              <RepoCard key={repo.id} repo={repo} rank={index + 1} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}