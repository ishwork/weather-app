# Weather app

A Next.js app for checking weather, bootstrapped with create-next-app.

## Demo

- **Production (Vercel):** [https://weatherly-ik.vercel.app](https://weatherly-ik.vercel.app/)
- **Local:** [http://localhost:3000](http://localhost:3000) — run `npm run dev`, first ([Getting started](#getting-started))

## Features

- Server-first App Router — `layout.tsx` and the home `page.tsx` render on the server. Only weather, search, and related UIs that need the browser or hooks are marked `use client`.
- City search — Autocomplete is backed by `/api/geocode`. Choosing a suggestion sets `?city=` on the URL and loads forecasts for that place.
- Browser geolocation — When no city is set, the app can request your location and load coordinates (with clear errors if access is denied).
- Current, hourly, and daily forecasts — Temperature, conditions, wind, precipitation, and related fields from Open-Meteo.
- Unit toggle — Switch between units for temperature, wind, and precipitation (client context, persisted in the UI).
- Loading and error states — Dedicated UI for geolocation, fetch loading, and API errors.
- Next.js API routes — For city search, the client calls `/api/geocode` for suggestions, then `/api/weather` for the forecast. When the user shares browser location, it calls `/api/weather` with latitude and longitude (skipping `/api/geocode`). Route handlers in `app/api/` run on the server and call Open-Meteo for geocoding and forecasts, and OpenStreetMap reverse geocoding when a place name is needed for coordinates.

## Technologies

- App and UI — Next.js (App Router), React 19, TypeScript, Sass modules.
- Data — Open-Meteo forecast API; Open-Meteo geocoding for city search and resolving `city` queries; Nominatim (OpenStreetMap) for reverse geocoding when using lat/lon.
- Testing and quality — Vitest, Testing Library, ESLint (with `eslint-config-next`), Prettier.
- CI — GitHub Actions workflow (`.github/workflows/ci.yml`) for install, lint, build, audit, and tests.

## Prerequisites

- Node.js 20.x (matches CI in `.github/workflows/ci.yml`)

## Getting started

Install dependencies.

The project is pinned with **package-lock.json**. Use **npm** in the commands below to match the same dependency tree as CI. The other lines are optional alternatives (yarn, pnpm, Bun) for local development.

```bash
npm i
# or
yarn
# or
pnpm i
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 in your browser.

## Scripts

- `npm run dev` — Start the dev server
- `npm run build` — Production build
- `npm run start` — Run the production server
- `npm run eslint` — Run ESLint
- `npm run format` — Format with Prettier
- `npm run format:check` — Check formatting with Prettier
- `npm run test:react` — Run unit tests (Vitest)
- `npm run test:watch` — Run Vitest in watch mode
- `npm run test:audit` — Run `npm audit` (high+)
