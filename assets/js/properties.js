import './main.js';
import { FINISHING_OPTIONS, LOCATIONS, PROPERTIES, PURPOSE_LABELS, TYPE_LABELS } from './data.js';
import { icon, populateSelect, renderPropertyCard } from './components.js';
import { formatNumber } from './format.js';

const FILTER_KEYS = ['q', 'location', 'type', 'purpose', 'minPrice', 'maxPrice', 'beds', 'baths', 'minArea', 'maxArea', 'finishing', 'sort'];
const DEFAULT_SORT = 'newest';

const CHIP_LABELS = {
  q: 'بحث',
  location: 'الموقع',
  type: 'النوع',
  purpose: 'العملية',
  minPrice: 'أقل سعر',
  maxPrice: 'أعلى سعر',
  beds: 'غرف النوم',
  baths: 'الحمامات',
  minArea: 'أقل مساحة',
  maxArea: 'أكبر مساحة',
  finishing: 'التشطيب',
};

const SORTERS = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  newest: (a, b) => b.listingDate.localeCompare(a.listingDate),
  'area-desc': (a, b) => b.area - a.area,
};

const form = document.querySelector('#filterForm');
const resultsEl = document.querySelector('[data-results]');
const emptyEl = document.querySelector('[data-empty]');
const countEl = document.querySelector('#results-heading');
const chipsEl = document.querySelector('[data-active-filters]');
const hintEl = document.querySelector('[data-range-hint]');
const filterPanel = document.querySelector('#filterPanel');
const filterToggle = document.querySelector('#toggleFilters');

populateSelect(form.elements.namedItem('location'), LOCATIONS.map((item) => [item, item]), 'كل المواقع');
populateSelect(form.elements.namedItem('type'), Object.entries(TYPE_LABELS), 'كل الأنواع');
populateSelect(form.elements.namedItem('finishing'), FINISHING_OPTIONS.map((item) => [item, item]), 'كل مستويات التشطيب');

function readState() {
  const data = new FormData(form);
  return Object.fromEntries(FILTER_KEYS.map((key) => [key, String(data.get(key) ?? '').trim()]));
}

function writeState(state) {
  for (const key of FILTER_KEYS) {
    const field = form.elements.namedItem(key);
    if (field) field.value = state[key] ?? '';
  }
}

function readStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(FILTER_KEYS.map((key) => [key, params.get(key) ?? (key === 'sort' ? DEFAULT_SORT : '')]));
}

function syncUrl(state) {
  const params = new URLSearchParams();
  for (const key of FILTER_KEYS) {
    if (state[key] && !(key === 'sort' && state[key] === DEFAULT_SORT)) params.set(key, state[key]);
  }
  const query = params.toString();
  window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
}

function matches(property, state) {
  if (state.q) {
    const haystack = normalize(`${property.title} ${property.location} ${property.governorate} ${TYPE_LABELS[property.type]}`);
    if (!haystack.includes(normalize(state.q))) return false;
  }
  if (state.location && property.location !== state.location) return false;
  if (state.type && property.type !== state.type) return false;
  if (state.purpose && property.purpose !== state.purpose) return false;
  if (state.minPrice && property.price < Number(state.minPrice)) return false;
  if (state.maxPrice && property.price > Number(state.maxPrice)) return false;
  if (state.beds && (property.beds ?? 0) < Number(state.beds)) return false;
  if (state.baths && (property.baths ?? 0) < Number(state.baths)) return false;
  if (state.minArea && property.area < Number(state.minArea)) return false;
  if (state.maxArea && property.area > Number(state.maxArea)) return false;
  if (state.finishing && property.finishing !== state.finishing) return false;
  return true;
}

function normalize(text) {
  return text.replace(/[إأآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').toLowerCase();
}

function displayValue(key, value) {
  if (key === 'type') return TYPE_LABELS[value] ?? value;
  if (key === 'purpose') return PURPOSE_LABELS[value] ?? value;
  if (key === 'minPrice' || key === 'maxPrice') return `${formatNumber(Number(value))} جنيه`;
  if (key === 'minArea' || key === 'maxArea') return `${formatNumber(Number(value))} م²`;
  if (key === 'beds' || key === 'baths') return `${formatNumber(Number(value))} أو أكثر`;
  return value;
}

function renderChips(state) {
  chipsEl.replaceChildren();
  for (const key of Object.keys(CHIP_LABELS)) {
    if (!state[key]) continue;
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'chip';
    chip.dataset.clearKey = key;
    chip.setAttribute('aria-label', `إزالة فلتر ${CHIP_LABELS[key]}`);
    chip.textContent = `${CHIP_LABELS[key]}: ${displayValue(key, state[key])}`;
    chip.insertAdjacentHTML('beforeend', icon('close'));
    chipsEl.append(chip);
  }
}

function render() {
  const state = readState();
  syncUrl(state);

  const minPrice = Number(state.minPrice);
  const maxPrice = Number(state.maxPrice);
  const rangeInvalid = state.minPrice && state.maxPrice && minPrice > maxPrice;
  hintEl.hidden = !rangeInvalid;

  const results = rangeInvalid
    ? []
    : PROPERTIES.filter((property) => matches(property, state)).sort(SORTERS[state.sort] ?? SORTERS[DEFAULT_SORT]);

  resultsEl.innerHTML = results.map((property, index) => renderPropertyCard(property, { delay: Math.min(index, 8) * 60 })).join('');
  resultsEl.hidden = results.length === 0;
  emptyEl.hidden = results.length > 0 || rangeInvalid;
  countEl.innerHTML = `عرض ${formatNumber(results.length)} من ${formatNumber(PROPERTIES.length)} عقار`;
  renderChips(state);
}

form.addEventListener('input', render);
form.addEventListener('change', render);
form.addEventListener('reset', () => window.setTimeout(render, 0));

chipsEl.addEventListener('click', (event) => {
  const chip = event.target.closest('[data-clear-key]');
  if (!chip) return;
  const field = form.elements.namedItem(chip.dataset.clearKey);
  if (field) field.value = '';
  render();
});

document.querySelector('[data-clear-all]').addEventListener('click', () => {
  writeState(Object.fromEntries(FILTER_KEYS.map((key) => [key, key === 'sort' ? DEFAULT_SORT : ''])));
  render();
});

function setFilterPanelOpen(open) {
  filterPanel.classList.toggle('is-open', open);
  filterToggle.setAttribute('aria-expanded', String(open));
}

filterToggle.addEventListener('click', () => setFilterPanelOpen(!filterPanel.classList.contains('is-open')));
document.querySelector('#closeFilters').addEventListener('click', () => {
  setFilterPanelOpen(false);
  resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

writeState(readStateFromUrl());
render();
