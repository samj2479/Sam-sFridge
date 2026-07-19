import { escapeHtml, normalize } from './utils.js';
import { getFridgeItems, getRecipeItems } from './store.js';

const canMakeListEl = document.getElementById('canMakeList');
const almostListEl = document.getElementById('almostList');

function getFridgeNameSet() {
  return new Set(getFridgeItems().map(item => normalize(item.name)));
}

function missingIngredients(recipe, fridgeSet) {
  return recipe.ingredients.filter(ing => !fridgeSet.has(normalize(ing.name)));
}

export function renderSuggestions() {
  const fridgeSet = getFridgeNameSet();
  const canMake = [];
  const almost = [];

  getRecipeItems().forEach(recipe => {
    const missing = missingIngredients(recipe, fridgeSet);
    if (missing.length === 0) {
      canMake.push({ recipe, missing });
    } else if (missing.length <= 2) {
      almost.push({ recipe, missing });
    }
  });

  canMakeListEl.innerHTML = canMake.length
    ? canMake.map(({ recipe }) => recipeCardHtml(recipe, [], 'can-make')).join('')
    : '<p class="empty-note">지금 만들 수 있는 요리가 없어요. (Nothing you can fully make yet.)</p>';

  almostListEl.innerHTML = almost.length
    ? almost.map(({ recipe, missing }) => recipeCardHtml(recipe, missing, 'almost')).join('')
    : '<p class="empty-note">거의 다 있는 요리가 없어요. (Nothing close either.)</p>';
}

function recipeCardHtml(recipe, missing, extraClass) {
  const missingNames = new Set(missing.map(m => normalize(m.name)));
  return `
    <div class="recipe-card ${extraClass}">
      <h3><span><span class="recipe-num">#${recipe.num}</span>${escapeHtml(recipe.name)}</span></h3>
      <ul>${recipe.ingredients.map(ing => {
        const isMissing = missingNames.has(normalize(ing.name));
        return `<li class="${isMissing ? 'missing' : ''}">${escapeHtml(ing.name)}${ing.qty ? ` (${escapeHtml(ing.qty)})` : ''}${isMissing ? ' — 없음 (missing)' : ''}</li>`;
      }).join('')}</ul>
    </div>
  `;
}
