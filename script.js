const FRIDGE_KEY = 'samsfridge_fridge';
const RECIPES_KEY = 'samsfridge_recipes';

let fridge = loadFridge();
let recipes = loadRecipes();

function loadFridge() {
  try { return JSON.parse(localStorage.getItem(FRIDGE_KEY)) || []; }
  catch { return []; }
}

function loadRecipes() {
  try { return JSON.parse(localStorage.getItem(RECIPES_KEY)) || []; }
  catch { return []; }
}

function saveFridge() { localStorage.setItem(FRIDGE_KEY, JSON.stringify(fridge)); }
function saveRecipes() { localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes)); }

function normalize(name) { return name.trim().toLowerCase(); }

// ---------- Tabs ----------
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ---------- Fridge ----------
const fridgeForm = document.getElementById('fridgeForm');
const fridgeNameInput = document.getElementById('fridgeName');
const fridgeQtyInput = document.getElementById('fridgeQty');
const fridgeListEl = document.getElementById('fridgeList');

fridgeForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = fridgeNameInput.value.trim();
  const qty = fridgeQtyInput.value.trim();
  if (!name) return;
  fridge.push({ id: Date.now(), name, qty });
  saveFridge();
  fridgeNameInput.value = '';
  fridgeQtyInput.value = '';
  fridgeNameInput.focus();
  renderAll();
});

function removeFridgeItem(id) {
  fridge = fridge.filter(item => item.id !== id);
  saveFridge();
  renderAll();
}

function renderFridge() {
  fridgeListEl.innerHTML = '';
  if (fridge.length === 0) {
    fridgeListEl.innerHTML = '<li class="empty-note">냉장고가 비어있어요. 재료를 추가해보세요. (Fridge is empty — add some ingredients.)</li>';
    return;
  }
  fridge.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="item-main">${escapeHtml(item.name)}${item.qty ? `<span class="item-qty">${escapeHtml(item.qty)}</span>` : ''}</span>
      <button class="delete-btn" title="삭제">✕</button>
    `;
    li.querySelector('.delete-btn').addEventListener('click', () => removeFridgeItem(item.id));
    fridgeListEl.appendChild(li);
  });
}

// ---------- Recipes ----------
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

addIngredientRowBtn.addEventListener('click', () => {
  ingredientRowsEl.appendChild(makeIngredientRow());
});

ingredientRowsEl.querySelectorAll('.removeRowBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (ingredientRowsEl.children.length > 1) btn.closest('.ingredient-row').remove();
  });
});

recipeForm.addEventListener('submit', e => {
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

  const nextNum = recipes.length > 0 ? Math.max(...recipes.map(r => r.num)) + 1 : 1;
  recipes.push({ id: Date.now(), num: nextNum, name, ingredients });
  saveRecipes();

  recipeNameInput.value = '';
  ingredientRowsEl.innerHTML = '';
  ingredientRowsEl.appendChild(makeIngredientRow());

  renderAll();
});

function removeRecipe(id) {
  recipes = recipes.filter(r => r.id !== id);
  saveRecipes();
  renderAll();
}

function renderRecipeList() {
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

// ---------- Suggestions ----------
const canMakeListEl = document.getElementById('canMakeList');
const almostListEl = document.getElementById('almostList');

function getFridgeNameSet() {
  return new Set(fridge.map(item => normalize(item.name)));
}

function missingIngredients(recipe, fridgeSet) {
  return recipe.ingredients.filter(ing => !fridgeSet.has(normalize(ing.name)));
}

function renderSuggestions() {
  const fridgeSet = getFridgeNameSet();
  const canMake = [];
  const almost = [];

  recipes.forEach(recipe => {
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

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderAll() {
  renderFridge();
  renderRecipeList();
  renderSuggestions();
}

renderAll();
