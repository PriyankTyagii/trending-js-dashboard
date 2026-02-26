# ⚡ Trending in JavaScript

A full-stack developer dashboard that surfaces what's trending in the JavaScript ecosystem — top GitHub repositories and hot Dev.to articles, all in one clean interface.

![Stack](https://img.shields.io/badge/Frontend-React_18-61dafb?style=flat-square&logo=react)
![Stack](https://img.shields.io/badge/Backend-Node.js_+_Express-6da55f?style=flat-square&logo=node.js)
![Stack](https://img.shields.io/badge/Styling-Tailwind_CSS-38bdf8?style=flat-square&logo=tailwindcss)
![Stack](https://img.shields.io/badge/Build-Vite-646cff?style=flat-square&logo=vite)

---

## Overview

Trending in JavaScript aggregates real-time data from two public APIs and presents it in a minimal, interactive dashboard. It was built as a full-stack exercise demonstrating API proxy architecture, clean component design, and practical developer tooling.

**Live data sources:**
- **GitHub API** — top JavaScript repositories ranked by star count
- **Dev.to API** — trending JavaScript articles ranked by hotness score

---

## Features

- Browse the top 10 trending JavaScript GitHub repositories
- Browse the top 10 trending JavaScript articles from Dev.to
- Real-time search across repo names, descriptions, article titles, authors, and tags
- Sort repositories by stars, forks, or last updated date
- Sort articles by reactions, publish date, or reading time
- Smooth hover interactions and staggered page animations
- Full loading, error, and empty states on every page
- Responsive layout — works on mobile and desktop

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 | UI framework |
| Routing | React Router v6 | Client-side navigation |
| Styling | Tailwind CSS v3 | Utility-first styles |
| Fonts | Plus Jakarta Sans, JetBrains Mono | Typography |
| Build Tool | Vite | Dev server + bundler |
| Backend | Node.js + Express | REST API server |
| Config | dotenv | Environment variables |
| HTTP | Native fetch (Node 18+) | API requests |

---

## Project Structure

```
trending-js-dashboard/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── repos.js            # GET /api/repos
│   │   │   └── articles.js         # GET /api/articles
│   │   ├── services/
│   │   │   ├── githubService.js    # GitHub API integration + transform
│   │   │   └── devtoService.js     # Dev.to API integration + transform
│   │   └── index.js                # Express app + middleware setup
│   ├── .env                        # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Landing.jsx         # Home page with navigation cards
    │   │   ├── Repos.jsx           # Trending repositories page
    │   │   └── Articles.jsx        # Trending articles page
    │   ├── components/
    │   │   ├── RepoCard.jsx        # Individual repository card
    │   │   ├── ArticleCard.jsx     # Individual article card
    │   │   └── SearchBar.jsx       # Reusable search input
    │   ├── services/
    │   │   └── api.js              # Backend API fetch helpers
    │   ├── App.jsx                 # Route definitions
    │   ├── main.jsx                # React entry point
    │   └── index.css               # Global styles + CSS variables
    ├── vite.config.js              # Vite config with API proxy
    ├── tailwind.config.js
    └── package.json
```

---

## Getting Started

### Prerequisites

- Node.js **v18 or higher** (required for native `fetch` support)
- npm v9+

Check your version:
```bash
node --version
```

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/trending-js-dashboard.git
cd trending-js-dashboard
```

---

### 2. Set up the backend

```bash
cd backend
npm install
```

Configure your environment variables:
```bash
# backend/.env

PORT=5000

# Optional but recommended — raises GitHub API rate limit from 60 to 5,000 req/hr
# Generate a free token at: https://github.com/settings/tokens
# No scopes or permissions are required
GITHUB_TOKEN=your_token_here
```

Start the backend server:
```bash
npm run dev
```

The server starts at `http://localhost:5000`. Verify it's working:
```bash
# Test repos endpoint
curl http://localhost:5000/api/repos

# Test articles endpoint
curl http://localhost:5000/api/articles
```

---

### 3. Set up the frontend

Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

The app opens at **http://localhost:5173**.

---

### Both servers must be running simultaneously

| Process | URL |
|---|---|
| Backend API | http://localhost:5000 |
| Frontend App | http://localhost:5173 |

The Vite dev server automatically proxies all `/api/*` requests to the backend, so there are no CORS issues during development.

---

## API Reference

### `GET /api/repos`

Returns the top 10 trending JavaScript repositories from GitHub.

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": 10270250,
      "full_name": "facebook/react",
      "html_url": "https://github.com/facebook/react",
      "description": "The library for web and native user interfaces.",
      "stargazers_count": 224000,
      "forks_count": 45800,
      "open_issues_count": 921,
      "language": "JavaScript",
      "updated_at": "2024-07-01T12:00:00Z",
      "owner_avatar": "https://avatars.githubusercontent.com/u/69631"
    }
  ]
}
```

---

### `GET /api/articles`

Returns the top 10 trending JavaScript articles from Dev.to.

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": 1902345,
      "title": "JavaScript Tips You Wish You Knew Earlier",
      "canonical_url": "https://dev.to/author/article-slug",
      "positive_reactions_count": 847,
      "published_at": "2024-06-28T09:00:00Z",
      "reading_time_minutes": 6,
      "tag_list": ["javascript", "webdev", "tips"],
      "cover_image": "https://...",
      "user": {
        "name": "Jane Dev",
        "username": "janedev",
        "profile_image": "https://..."
      }
    }
  ]
}
```

---

### `GET /`

Health check endpoint.

```json
{ "status": "ok", "message": "Trending JS Dashboard API is running" }
```

---

## Architecture Decisions

**Why a backend proxy?**
Calling the GitHub and Dev.to APIs directly from the browser exposes your GitHub token and is subject to browser CORS restrictions. The backend acts as a secure proxy — it holds the token in an environment variable, transforms the API responses to only the fields the frontend needs, and provides a single consistent interface regardless of upstream API changes.

**Why separate `services/` from `routes/`?**
Routes handle HTTP concerns: parsing requests, setting status codes, and sending responses. Services handle business logic: fetching from external APIs and transforming data. This separation makes each layer independently testable and makes it straightforward to swap out the data source without touching the route layer.

**Why Vite's proxy?**
In development, the frontend and backend run on different ports. Rather than configuring CORS headers on the backend or hardcoding the backend URL in the frontend, Vite's built-in proxy forwards all `/api` requests to `localhost:5000`. The frontend code only ever references `/api/repos` — never a full URL — which means zero changes are needed when deploying to production, as long as the frontend is served from the same origin as the backend.

---

## Production Readiness — Next Steps

This project is built as a functional prototype. Before releasing to production, the following should be addressed:

### Performance & Reliability
- **Response caching** — The GitHub API allows 60 unauthenticated requests per hour (5,000 with a token). Add a caching layer using Redis or an in-memory store like `node-cache` with a TTL of 10–15 minutes. This dramatically reduces upstream API calls and improves response times.
- **Pagination** — Extend both endpoints to accept `?page=` and `?per_page=` query parameters so the frontend can load more results on demand rather than being limited to 10.
- **Rate limiting** — Add `express-rate-limit` middleware to prevent abuse of the backend endpoints.
- **Request timeout handling** — Wrap upstream API calls with a timeout (e.g., `AbortController` with a 5-second limit) to prevent the backend from hanging on slow external responses.

### Observability
- **Structured logging** — Replace `console.log` with a proper logger such as `pino` or `winston`. This enables log levels, JSON-formatted output, and compatibility with log aggregation services like Datadog or Logtail.
- **Error monitoring** — Integrate Sentry in both the frontend and backend to capture and report unhandled errors in real time.
- **Health checks** — Extend the `/` endpoint to verify connectivity to upstream APIs and return meaningful status codes for use with load balancer health probes.

### Security
- **Helmet** — Add the `helmet` middleware to set secure HTTP response headers.
- **Environment validation** — Use a library like `zod` or `envalid` to validate required environment variables at startup, failing fast with a clear error message rather than crashing at runtime.
- **Secrets management** — In production, store the GitHub token in a secrets manager (AWS Secrets Manager, Doppler, etc.) rather than a `.env` file.

### CI/CD
- **Containerize** — Write a `Dockerfile` for the backend and a separate one for the frontend build. Use a `docker-compose.yml` for local orchestration of both services.
- **GitHub Actions pipeline** — On every pull request: run ESLint, check for TypeScript errors, and run unit tests with Vitest. On merge to `main`: build and push Docker images, then trigger a deployment.
- **Deployment targets** — Deploy the backend to Railway, Render, or Fly.io. Deploy the frontend build to Vercel or Netlify, with `VITE_API_URL` set to the production backend URL.

### Maintainability
- **TypeScript** — Migrate both the backend and frontend to TypeScript for type safety, better IDE support, and reduced runtime errors.
- **Testing** — Add unit tests for the service layer (mocking the upstream APIs) and component tests for the React components using Vitest and React Testing Library.
- **API versioning** — Prefix routes with `/api/v1/` to allow non-breaking API evolution in the future.

---

## Common Issues

| Problem | Cause | Fix |
|---|---|---|
| GitHub API returns 403 | Rate limit hit (60/hr) | Add `GITHUB_TOKEN` to `backend/.env` |
| Frontend shows blank white screen | Missing or empty source files | Check browser console (F12) for import errors |
| `fetchRepos is not exported` error | `api.js` file is empty or missing exports | Re-paste the full content of `src/services/api.js` |
| `npm run dev` fails in backend | Missing `"type": "module"` in package.json | Add `"type": "module"` to `backend/package.json` |
| Vite proxy not working | Backend not running | Start backend first on port 5000 |
| Tailwind styles not applying | Missing `@tailwind` directives | Confirm `index.css` starts with the three `@tailwind` lines |

---

## License

MIT — free to use, modify, and distribute.

---

*Built with Node.js, React, and public APIs from GitHub and Dev.to.*