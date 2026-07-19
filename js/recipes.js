import { escapeHtml } from './utils.js';
import { getRecipeItems, addRecipe, removeRecipe } from './store.js';

const recipeForm = document.getElementById('recipeForm');
const recipeNameInput = document.getElementById('recipeName');
const ingredientRowsEl = document.getElementById('recipeIngredientRows');
const addIngredientRowBtn = document.getElementById('addIngredientRow');
const recipeListContainer = document.getElementById('recipeListContainer');

function makeIngredientRow() {
  const row = document.createElement('div');
  row.className = 'ingredient-row';
  row.innerHTML = `
    <input type="text" class="ingName" placeholder="재료 / Ingredient" required>
    <input type="text" class="ingQty" placeholder="수량 (선택) / Qty (optional)">
    <button type="button" class="removeRowBtn" title="삭제">✕</button>
  `;
  row.querySelector('.removeRowBtn').addEventListener('click', () => {
    if (ingredientRowsEl.children.length > 1) row.remove();
  });
  return row;
}

export function initRecipes() {
  ingredientRowsEl.querySelectorAll('.removeRowBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (ingredientRowsEl.children.length > 1) btn.closest('.ingredient-row').remove();
    });
  });

  addIngredientRowBtn.addEventListener('click', () => {
    ingredientRowsEl.appendChild(makeIngredientRow());
  });

  recipeForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = recipeNameInput.value.trim();
    if (!name) return;

    const ingredients = [...ingredientRowsEl.querySelectorAll('.ingredient-row')]
      .map(row => ({
        name: row.querySelector('.ingName').value.trim(),
        qty: row.querySelector('.ingQty').value.trim()
      }))
      .filter(ing => ing.name);

    if (ingredients.length === 0) return;

    await addRecipe({ name, ingredients });

    recipeNameInput.value = '';
    ingredientRowsEl.innerHTML = '';
    ingredientRowsEl.appendChild(makeIngredientRow());
  });
}

export function renderRecipes() {
  const recipes = getRecipeItems();
  recipeListContainer.innerHTML = '';

  if (recipes.length === 0) {
    recipeListContainer.innerHTML = '<p class="empty-note">아직 레시피가 없어요. 위에서 추가해보세요. (No recipes yet — add one above.)</p>';
    return;
  }

  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <h3><span><span class="recipe-num">#${recipe.num}</span>${escapeHtml(recipe.name)}</span>
        <button class="delete-btn" title="삭제">✕</button>
      </h3>
      <ul>${recipe.ingredients.map(ing => `<li>${escapeHtml(ing.name)}${ing.qty ? ` (${escapeHtml(ing.qty)})` : ''}</li>`).join('')}</ul>
    `;
    card.querySelector('.delete-btn').addEventListener('click', () => removeRecipe(recipe.id));
    recipeListContainer.appendChild(card);
  });
}
