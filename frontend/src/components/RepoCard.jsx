function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num;
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function RepoCard({ repo, rank }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 bg-[#16213e] border border-[#0f3460] rounded-xl p-5 hover:border-[#F7DF1E] hover:shadow-[0_0_20px_rgba(247,223,30,0.08)] transition-all duration-300"
    >
      {/* Rank */}
      <div className="flex-shrink-0 w-8 text-center">
        <span className="text-2xl font-bold text-[#0f3460] group-hover:text-[#F7DF1E] transition-colors">
          #{rank}
        </span>
      </div>

      {/* Avatar */}
      {repo.owner_avatar && (
        <img
          src={repo.owner_avatar}
          alt="owner"
          className="w-10 h-10 rounded-full flex-shrink-0 border border-[#0f3460]"
        />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h2 className="text-white font-semibold group-hover:text-[#F7DF1E] transition-colors truncate">
          {repo.full_name}
        </h2>
        <p className="text-slate-400 text-sm mt-1 line-clamp-2">
          {repo.description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1 text-yellow-400">
            ⭐ {formatNumber(repo.stargazers_count)}
          </span>
          <span className="flex items-center gap-1">
            🍴 {formatNumber(repo.forks_count)}
          </span>
          {repo.open_issues_count > 0 && (
            <span className="flex items-center gap-1">
              🔴 {formatNumber(repo.open_issues_count)} issues
            </span>
          )}
          <span>Updated {timeAgo(repo.updated_at)}</span>
          {repo.language && (
            <span className="bg-[#0f3460] text-slate-300 px-2 py-0.5 rounded-full">
              {repo.language}
            </span>
          )}
        </div>
      </div>

      {/* Arrow */}
      <div className="flex-shrink-0 self-center text-slate-600 group-hover:text-[#F7DF1E] group-hover:translate-x-1 transition-all">
        →
      </div>
    </a>
  );
}