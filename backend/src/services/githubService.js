const GITHUB_API_URL =
  "https://api.github.com/search/repositories?q=stars:>50000+language:javascript&sort=stars&order=desc&per_page=10";

export async function fetchTrendingRepos() {
  const headers = {
    Accept: "application/vnd.github.v3+json",
  };

  // Add token if available to increase rate limit from 60 → 5000 req/hr
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(GITHUB_API_URL, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API responded with status ${response.status}`);
  }

  const json = await response.json();

  // Transform and return only the fields we need
  return json.items.map((repo) => ({
    id: repo.id,
    full_name: repo.full_name,
    html_url: repo.html_url,
    description: repo.description || "No description provided.",
    stargazers_count: repo.stargazers_count,
    language: repo.language,
    forks_count: repo.forks_count,
    open_issues_count: repo.open_issues_count,
    updated_at: repo.updated_at,
    owner_avatar: repo.owner?.avatar_url || null,
  }));
}