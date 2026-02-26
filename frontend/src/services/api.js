const BASE_URL = "/api";

async function apiFetch(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Request failed with status ${response.status}`
    );
  }

  return response.json();
}

export async function fetchRepos() {
  const result = await apiFetch("/repos");
  return result.data;
}

export async function fetchArticles() {
  const result = await apiFetch("/articles");
  return result.data;
}