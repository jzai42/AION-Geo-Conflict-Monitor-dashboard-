<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AION Geo-Conflict Monitor Dashboard

Geo-conflict risk dashboard for tracking geopolitical conflict risks, energy shocks, and shipping disruptions.

## Product scope (MVP)

The shipped static dashboard prioritizes **shareable URLs** (copy link / system share) and the core monitoring UI. **Server-side PDF export is an enhancement:** the Share menu shows “Generate PDF” / “Download latest PDF” only when a PDF API is available — locally via `npm run dev`, or in production when the frontend is built with **`VITE_API_BASE`** pointing at a deployed PDF service (see below).

## Run Locally

**Prerequisites:** Node.js, and **Google Chrome** (or Chromium) on your machine for PDF export — or set `PUPPETEER_EXECUTABLE_PATH` to your browser binary (see `.env.example`).

1. Install dependencies:
   `npm ci`
2. To run the daily report generator locally, copy `.env.example` to `.env` (or export env vars) and set `GEMINI_API_KEY` from [Google AI Studio](https://aistudio.google.com/apikey). The GitHub Action uses the `GEMINI_API_KEY` repository secret.
3. Run the dashboard **and** the PDF API together:
   `npm run dev`  
   This starts Vite (default port **3000**) and the Express PDF service on **8787**. Frontend calls to `/api` are proxied to the PDF API.
   - Frontend only: `npm run dev:client`
   - PDF API only: `npm run dev:api`
4. Production build of the static site (`npm run build`) does **not** include the PDF server. On a plain static host (e.g. GitHub Pages) without `VITE_API_BASE`, the Share menu omits PDF actions. To enable them on a deployed site, host the PDF API separately and set **`VITE_API_BASE`** to that API origin (no trailing slash) when running `npm run build`. For local preview with the API: `npm run dev:api` in one terminal, then `npm run preview` in another (preview also proxies `/api` to `8787`).

## Verify PDF API (CLI)

With the PDF API running (`npm run dev:api` or `npm run dev`):

- Quick health check only:
  `npm run verify:pdf`
- Full flow (generate + poll + download PDF bytes — slower):
  `npm run verify:pdf:full`

Point to another host:
`PDF_API_URL=https://your-api.example.com npm run verify:pdf`

## Docker (PDF API only)

Build and run the PDF service on port **8787** (bundled Chromium inside the image):

```bash
docker compose up --build -d
# or: npm run docker:up
```

Build image only: `npm run docker:build`

After deploy, set `VITE_API_BASE` to `http://<host>:8787` (or your HTTPS URL) when building the static frontend.

