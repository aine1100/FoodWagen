# FoodWagen

Next.js + TypeScript app implementing the FoodWagen landing and CRUD with a mock API. State is managed with Zustand; styling is Tailwind CSS v4. Search, add/edit/delete flows, and notifications are implemented.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Zustand (global store)
- Lucide React (icons)
- Vitest + React Testing Library (tests)

## Requirements covered

- Responsive landing: Header, Hero, Featured Meals, Footer
- Reusable UI: Button, Dropdown, MealCard, Modal
- API integration: GET/POST/PUT/DELETE to the Mock API
- Search by food name (case-insensitive, substring match) on button click
- Loading/empty/error states, success/error toasts
- Cards: entry slide-up animation and hover effect

## Getting started

Install with pnpm (recommended):

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

## Scripts

```bash
pnpm dev         # start dev server
pnpm build       # production build
pnpm start       # start production server
pnpm test        # run tests once
pnpm test:watch  # run tests in watch mode
```

## Project structure

```
app/
  page.tsx, layout.tsx, globals.css
components/
  cards/meal-card.tsx
  modals/meal-modal.tsx
  sections/{header,hero,featured-meals,footer}.tsx
  utils/{button,dropdown,toast}.tsx
lib/api.ts            # API helpers
store/{food,notify}.ts# Zustand stores
```

## Environment

No secret env is required for the mock API. Remote images are rendered with `next/image` using `unoptimized` to avoid domain config.

## Testing

This project uses Vitest + React Testing Library.

```bash
pnpm test
```

Included tests (see `__tests__/`):

- Component Rendering: MealCard renders name/price/rating
- User Interaction: opens the 3-dots menu and triggers Delete
- API Mocking: store fetch success and error (mocked `fetch`) and error UI

## Deployment

Deploy on Vercel:

1. Push to GitHub (main branch)
2. Import the repo in Vercel
3. Build & deploy (no env needed)

## Notes

- Search filters locally (case-insensitive substring match) for robust results like "vanilla" → "Vanilla Cupcake".
- Duplicate items are de-duplicated in the store by normalized name + restaurant name.
