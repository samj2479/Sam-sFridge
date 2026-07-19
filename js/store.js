// In-memory app state + mutations. UI modules call these functions instead
// of touching storage.js directly, and re-render via subscribe().
// This is the seam to rewire when a real backend replaces localStorage.

import { getFridge, setFridge, getRecipes, setRecipes } from './storage.js';

let fridge = [];
let recipes = [];
const listeners = [];

export function subscribe(fn) {
  listeners.push(fn);
}

function notify() {
  listeners.forEach(fn => fn());
}

export async function loadState() {
  fridge = await getFridge();
  recipes = await getRecipes();
  notify();
}

export function getFridgeItems() {
  return fridge;
}

export function getRecipeItems() {
  return recipes;
}

export async function addFridgeItem({ name, qty }) {
  fridge.push({ id: Date.now(), name, qty });
  await setFridge(fridge);
  notify();
}

export async function removeFridgeItem(id) {
  fridge = fridge.filter(item => item.id !== id);
  await setFridge(fridge);
  notify();
}

export async function addRecipe({ name, ingredients }) {
  const nextNum = recipes.length > 0 ? Math.max(...recipes.map(r => r.num)) + 1 : 1;
  recipes.push({ id: Date.now(), num: nextNum, name, ingredients });
  await setRecipes(recipes);
  notify();
}

export async function removeRecipe(id) {
  recipes = recipes.filter(r => r.id !== id);
  await setRecipes(recipes);
  notify();
}
