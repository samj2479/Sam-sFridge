# Sam's Fridge 🧊

A personal web app to track fridge ingredients and recipes, and get
suggestions for what you can cook with what's currently on hand.

## Stack

Next.js (App Router) + Tailwind CSS + plain JavaScript.

- `/` — Korean site
- `/en` — English site

Both routes render the same shared components (`components/`) with a
`dict` (dictionary) prop from `lib/dictionaries.js`, so UI/content changes
only need to be written once.

## Features

- **Fridge**: add/remove ingredients currently in your fridge.
- **Recipes**: save recipes (auto-numbered #1, #2, ...) with their ingredient lists.
- **Suggestions**: see which recipes you can make right now, and which are close
  (missing 1-2 ingredients).

Data is stored in the browser (`localStorage`) via `lib/storage.js`. UI
components never touch storage directly — they go through
`lib/useFridgeStore.js`. When a real backend is added, only
`lib/storage.js` (swap localStorage calls for `fetch()`s) should need
to change.

## Running locally

```
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Hosting

This now requires a Node server (not a static host like GitHub Pages) —
Vercel is the easiest option and connects directly to this GitHub repo.
