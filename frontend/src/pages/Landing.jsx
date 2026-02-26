import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-5xl">⚡</span>
          <h1 className="text-5xl font-bold text-[#F7DF1E]">
            Trending in JavaScript
          </h1>
        </div>
        <p className="text-slate-400 text-lg max-w-md mx-auto">
          Discover what's hot in the JavaScript ecosystem — top GitHub repos and
          developer articles, updated in real time.
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
        <button
          onClick={() => navigate("/repos")}
          className="flex-1 group flex flex-col items-center gap-3 bg-[#16213e] border-2 border-[#0f3460] rounded-2xl p-8 hover:border-[#F7DF1E] hover:shadow-[0_0_30px_rgba(247,223,30,0.15)] transition-all duration-300"
        >
          <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
            🌟
          </span>
          <span className="text-xl font-semibold text-white">
            Trending JS Repos
          </span>
          <span className="text-sm text-slate-400 text-center">
            Top JavaScript repositories on GitHub ranked by stars
          </span>
          <span className="mt-2 text-[#F7DF1E] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Explore →
          </span>
        </button>

        <button
          onClick={() => navigate("/articles")}
          className="flex-1 group flex flex-col items-center gap-3 bg-[#16213e] border-2 border-[#0f3460] rounded-2xl p-8 hover:border-[#F7DF1E] hover:shadow-[0_0_30px_rgba(247,223,30,0.15)] transition-all duration-300"
        >
          <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
            📰
          </span>
          <span className="text-xl font-semibold text-white">
            Trending JS Articles
          </span>
          <span className="text-sm text-slate-400 text-center">
            Hottest JavaScript articles from the Dev.to community
          </span>
          <span className="mt-2 text-[#F7DF1E] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Explore →
          </span>
        </button>
      </div>

      {/* Footer */}
      <p className="mt-16 text-slate-600 text-sm">
        Powered by GitHub API & Dev.to API
      </p>
    </div>
  );
}