import './main.js';
import { CATEGORIES, LOCATIONS, PROPERTIES, TESTIMONIALS, TYPE_LABELS } from './data.js';
import { icon, populateSelect, renderPropertyCard } from './components.js';
import { escapeHtml, formatNumber } from './format.js';

const TYPE_OPTIONS = Object.entries(TYPE_LABELS);

populateSelect(document.querySelector('#heroLocation'), LOCATIONS.map((item) => [item, item]), 'كل المواقع');
populateSelect(document.querySelector('#heroType'), TYPE_OPTIONS, 'كل الأنواع');

document.querySelector('[data-featured]').innerHTML = PROPERTIES.filter((property) => property.featured)
  .slice(0, 6)
  .map((property, index) => renderPropertyCard(property, { delay: index * 80 }))
  .join('');

document.querySelector('[data-categories]').innerHTML = CATEGORIES.map(
  ({ label, type, image, description }, index) => `
    <a class="category-card reveal" href="properties.html?type=${type}" style="--delay: ${index * 80}ms">
      <img src="${escapeHtml(image)}" alt="${escapeHtml(label)}" loading="lazy" data-fallback />
      <h3>${escapeHtml(label)}</h3>
      <p>${escapeHtml(description)}</p>
      <span class="category-link">تصفح ${escapeHtml(label)} ${icon('arrowLeft')}</span>
    </a>`,
).join('');

document.querySelector('[data-testimonials]').innerHTML = TESTIMONIALS.map(
  ({ quote, name, detail }, index) => `
    <figure class="testimonial reveal" style="--delay: ${index * 100}ms">
      <blockquote>${escapeHtml(quote)}</blockquote>
      <figcaption>
        <footer>
          <strong>${escapeHtml(name)}</strong>
          <span>${escapeHtml(detail)}</span>
        </footer>
      </figcaption>
    </figure>`,
).join('');

const statValues = [PROPERTIES.length, TYPE_OPTIONS.length, LOCATIONS.length, new Set(PROPERTIES.map((p) => p.agentId)).size];
document.querySelectorAll('[data-stats] [data-count]').forEach((element, index) => {
  element.dataset.count = String(statValues[index]);
  element.textContent = formatNumber(0);
});

const heroSearch = document.querySelector('#heroSearch');
const heroError = document.querySelector('#heroSearchError');

heroSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(heroSearch);
  const params = new URLSearchParams();
  for (const key of ['location', 'type', 'purpose', 'minPrice', 'maxPrice']) {
    const value = String(data.get(key) ?? '').trim();
    if (value) params.set(key, value);
  }
  const min = Number(params.get('minPrice'));
  const max = Number(params.get('maxPrice'));
  if (params.has('minPrice') && params.has('maxPrice') && min > max) {
    heroError.textContent = 'الحد الأدنى للسعر يجب أن يكون أقل من الحد الأقصى.';
    return;
  }
  heroError.textContent = '';
  const query = params.toString();
  window.location.href = query ? `properties.html?${query}` : 'properties.html';
});
