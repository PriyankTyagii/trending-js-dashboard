function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ArticleCard({ article }) {
  return (
    <a
      href={article.canonical_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-4 bg-[#16213e] border border-[#0f3460] rounded-xl p-5 hover:border-[#F7DF1E] hover:shadow-[0_0_20px_rgba(247,223,30,0.08)] transition-all duration-300"
    >
      {/* Cover image */}
      {article.cover_image && (
        <img
          src={article.cover_image}
          alt="cover"
          className="w-24 h-20 object-cover rounded-lg flex-shrink-0 border border-[#0f3460]"
        />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h2 className="text-white font-semibold group-hover:text-[#F7DF1E] transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h2>

        {/* Author */}
        <div className="flex items-center gap-2 mt-2">
          {article.user.profile_image && (
            <img
              src={article.user.profile_image}
              alt={article.user.name}
              className="w-5 h-5 rounded-full border border-[#0f3460]"
            />
          )}
          <span className="text-sm text-slate-400">{article.user.name}</span>
          <span className="text-slate-600 text-xs">·</span>
          <span className="text-slate-500 text-xs">
            {formatDate(article.published_at)}
          </span>
        </div>

        {/* Stats & Tags */}
        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
          <span className="text-pink-400 flex items-center gap-1">
            ❤️ {article.positive_reactions_count}
          </span>
          <span className="text-slate-500">
            🕐 {article.reading_time_minutes} min read
          </span>
          {article.tag_list.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-[#0f3460] text-slate-300 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="flex-shrink-0 self-center text-slate-600 group-hover:text-[#F7DF1E] group-hover:translate-x-1 transition-all">
        →
      </div>
    </a>
  );
}