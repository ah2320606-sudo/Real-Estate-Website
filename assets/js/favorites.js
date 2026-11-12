import './main.js';
import { renderPropertyCard, showToast } from './components.js';
import { PROPERTIES } from './data.js';
import { formatNumber } from './format.js';
import { FAVORITES_EVENT, getFavorites, removeFavorite } from './store.js';

const summary = document.querySelector('[data-favorites-summary]');
const total = document.querySelector('[data-favorites-total]');
const grid = document.querySelector('[data-favorites-grid]');
const empty = document.querySelector('[data-favorites-empty]');

function render() {
  const saved = getFavorites()
    .map((id) => PROPERTIES.find((property) => property.id === id))
    .filter(Boolean);

  grid.innerHTML = saved.map((property, index) => renderPropertyCard(property, { delay: index * 60, removable: true })).join('');
  total.textContent = `${formatNumber(saved.length)} ${saved.length === 1 ? 'عقار' : 'عقارات'}`;
  summary.hidden = saved.length === 0;
  empty.hidden = saved.length > 0;
}

grid.addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-remove-favorite]');
  if (!removeButton) return;
  removeFavorite(removeButton.dataset.id);
  showToast('تمت إزالة العقار من المفضلة.', 'info');
});

window.addEventListener(FAVORITES_EVENT, render);
render();
