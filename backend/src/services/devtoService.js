const DEVTO_API_URL =
  "https://dev.to/api/articles?tag=javascript&sort_by=hotness_score&per_page=10";

export async function fetchTrendingArticles() {
  const response = await fetch(DEVTO_API_URL, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Dev.to API responded with status ${response.status}`);
  }

  const json = await response.json();

  // Transform and return only the fields we need
  return json.map((article) => ({
    id: article.id,
    title: article.title,
    canonical_url: article.canonical_url,
    positive_reactions_count: article.positive_reactions_count,
    published_at: article.published_at,
    tag_list: article.tag_list || [],
    reading_time_minutes: article.reading_time_minutes,
    cover_image: article.cover_image || null,
    user: {
      name: article.user?.name || "Unknown",
      username: article.user?.username || "",
      profile_image: article.user?.profile_image || null,
    },
  }));
}