export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative flex-1">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full bg-[#16213e] border border-[#0f3460] text-white placeholder-slate-500 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#F7DF1E] transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
        >
          ✕
        </button>
      )}
    </div>
  );
}