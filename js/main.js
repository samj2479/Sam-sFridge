import { loadState, subscribe } from './store.js';
import { initTabs } from './tabs.js';
import { initFridge, renderFridge } from './fridge.js';
import { initRecipes, renderRecipes } from './recipes.js';
import { renderSuggestions } from './suggestions.js';

function renderAll() {
  renderFridge();
  renderRecipes();
  renderSuggestions();
}

subscribe(renderAll);

initTabs();
initFridge();
initRecipes();

loadState();
