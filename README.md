# Sam's Fridge 🧊

A simple personal web app to track fridge ingredients and recipes, and get
suggestions for what you can cook with what's currently on hand.

## Features

- **Fridge**: add/remove ingredients currently in your fridge.
- **Recipes**: save recipes (auto-numbered #1, #2, ...) with their ingredient lists.
- **Suggestions**: see which recipes you can make right now, and which are close
  (missing 1-2 ingredients).

All data is stored locally in your browser (`localStorage`) — nothing leaves
your device (for now — see "Future: backend" below).

## Project structure

```
index.html
css/
  style.css
js/
  main.js          entry point, wires everything together
  store.js         in-memory state + mutations (add/remove fridge items & recipes)
  storage.js       persistence layer — localStorage today, an API later
  tabs.js          tab switching
  fridge.js        fridge UI
  recipes.js       recipes UI
  suggestions.js   "what can I make" matching logic + UI
  utils.js         small shared helpers
```

`store.js` is the seam between the UI and persistence: UI modules call
things like `addFridgeItem()` or `removeRecipe()` and re-render via
`subscribe()`. They never touch `storage.js` directly.

## Future: backend

When a real database is added, only `storage.js` (and the `await`s already
in `store.js`) should need to change — swap the localStorage calls for
`fetch()` calls to an API. UI modules (`fridge.js`, `recipes.js`,
`suggestions.js`) shouldn't need to change at all.

## Running locally

Because `js/main.js` uses ES modules (`import`/`export`), opening
`index.html` directly by double-clicking it won't work — browsers block
module imports over the `file://` protocol. Serve the folder instead:

```
python -m http.server 8000
```

then open `http://localhost:8000`.

## Hosting

This is a static site (no build step), so it can be hosted directly on
GitHub Pages from this repo.
