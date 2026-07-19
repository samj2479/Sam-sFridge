import { escapeHtml } from './utils.js';
import { getFridgeItems, addFridgeItem, removeFridgeItem } from './store.js';

const fridgeForm = document.getElementById('fridgeForm');
const fridgeNameInput = document.getElementById('fridgeName');
const fridgeQtyInput = document.getElementById('fridgeQty');
const fridgeListEl = document.getElementById('fridgeList');

export function initFridge() {
  fridgeForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = fridgeNameInput.value.trim();
    const qty = fridgeQtyInput.value.trim();
    if (!name) return;

    await addFridgeItem({ name, qty });

    fridgeNameInput.value = '';
    fridgeQtyInput.value = '';
    fridgeNameInput.focus();
  });
}

export function renderFridge() {
  const fridge = getFridgeItems();
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
