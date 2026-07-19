// Persistence layer. Everything here is async on purpose, even though
// localStorage itself is synchronous — so that swapping this out for real
// API calls later doesn't require touching useFridgeStore.js or UI components.

const FRIDGE_KEY = 'samsfridge_fridge';
const RECIPES_KEY = 'samsfridge_recipes';

export async function getFridge() {
  try { return JSON.parse(localStorage.getItem(FRIDGE_KEY)) || []; }
  catch { return []; }
}

export async function setFridge(fridge) {
  localStorage.setItem(FRIDGE_KEY, JSON.stringify(fridge));
}

export async function getRecipes() {
  try { return JSON.parse(localStorage.getItem(RECIPES_KEY)) || []; }
  catch { return []; }
}

export async function setRecipes(recipes) {
  localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
}
