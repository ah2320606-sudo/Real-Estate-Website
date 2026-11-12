import { CATEGORIES, PURPOSE_LABELS, SITE, TYPE_LABELS } from './data.js';
import { escapeHtml, formatArea, formatNumber, formatPrice } from './format.js';
import { isFavorite } from './store.js';

const ICON_PATHS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  heart: '<path d="M19 14c1.5-1.4 3-3.2 3-5.5A4.5 4.5 0 0 0 17.5 4 4.8 4.8 0 0 0 12 6a4.8 4.8 0 0 0-5.5-2A4.5 4.5 0 0 0 2 8.5c0 2.3 1.5 4.1 3 5.5l7 7Z"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  area: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h6M9 3v6M15 21v-6M21 15h-6"/>',
  bed: '<path d="M3 18V6M3 14h18v4M21 14v-3a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="11" r="2"/>',
  bath: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M6 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2"/>',
  building: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
  paint: '<path d="M4 4h12v6H4zM16 7h3v4h-7v3"/><path d="M12 14v6"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chevronLeft: '<path d="m9 6 6 6-6 6"/>',
  chevronRight: '<path d="m15 6-6 6 6 6"/>',
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
  camera: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  play: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>',
  expand: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
};

export function icon(name, className = 'icon') {
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICON_PATHS[name]}</svg>`;
}

const NAV_LINKS = [
  { href: 'index.html', label: 'الرئيسية' },
  { href: 'properties.html', label: 'العقارات' },
  { href: 'about.html', label: 'من نحن' },
];

export function renderHeader(activePage) {
  const navItems = NAV_LINKS.map(({ href, label }) => {
    const current = href === activePage ? ' aria-current="page"' : '';
    return `<li><a class="nav-link" href="${href}"${current}>${label}</a></li>`;
  }).join('');
  const favoritesCurrent = activePage === 'favorites.html' ? ' aria-current="page"' : '';
  return `
    <a class="skip-link" href="#main">تخطي إلى المحتوى</a>
    <header class="site-header" data-site-header-bar>
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="NOVA - الصفحة الرئيسية">NOVA</a>
        <nav class="primary-nav" id="primaryNav" aria-label="القائمة الرئيسية">
          <ul class="nav-list">
            ${navItems}
            <li>
              <a class="nav-link nav-favorites" href="favorites.html"${favoritesCurrent}>
                المفضلة
                <span class="fav-count" data-favorites-count aria-label="عدد العقارات في المفضلة">0</span>
              </a>
            </li>
          </ul>
          <a class="btn btn-gold btn-sm nav-cta" href="contact.html">تواصل معنا</a>
        </nav>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primaryNav" aria-label="فتح القائمة">
          <span class="menu-toggle-bars" aria-hidden="true"></span>
        </button>
      </div>
    </header>`;
}

export function renderFooter() {
  const categoryLinks = CATEGORIES.map(
    ({ label, type }) => `<li><a href="properties.html?type=${type}">${label}</a></li>`,
  ).join('');
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <span class="brand brand-footer">NOVA</span>
          <p>منصة عقارية تعرض مجموعة مختارة من الشقق والفيلات والوحدات التجارية في مصر، مع معلومات واضحة وصور مطابقة لكل عقار.</p>
          <div class="social-links" aria-label="حسابات التواصل الاجتماعي">
            <button type="button" class="social-link" data-demo-message="حسابات التواصل الاجتماعي غير متصلة في هذه النسخة التجريبية" aria-label="إنستجرام">${icon('camera')}</button>
            <button type="button" class="social-link" data-demo-message="حسابات التواصل الاجتماعي غير متصلة في هذه النسخة التجريبية" aria-label="إكس">${icon('share')}</button>
            <button type="button" class="social-link" data-demo-message="حسابات التواصل الاجتماعي غير متصلة في هذه النسخة التجريبية" aria-label="يوتيوب">${icon('play')}</button>
          </div>
        </div>
        <nav class="footer-col" aria-label="روابط سريعة">
          <h2>روابط سريعة</h2>
          <ul>
            <li><a href="index.html">الرئيسية</a></li>
            <li><a href="properties.html">العقارات</a></li>
            <li><a href="favorites.html">المفضلة</a></li>
            <li><a href="about.html">من نحن</a></li>
            <li><a href="contact.html">تواصل معنا</a></li>
          </ul>
        </nav>
        <nav class="footer-col" aria-label="تصفح حسب النوع">
          <h2>أنواع العقارات</h2>
          <ul>${categoryLinks}</ul>
        </nav>
        <div class="footer-col">
          <h2>بيانات التواصل</h2>
          <ul class="footer-contact">
            <li>${icon('mail')}<span>${SITE.email}</span></li>
            <li>${icon('phone')}<span>${SITE.phone}</span></li>
            <li>${icon('pin')}<span>${SITE.address}</span></li>
          </ul>
          <p class="footer-note">بيانات التواصل توضيحية وستُحدَّث عند توفر البيانات الرسمية.</p>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© ${formatNumber(year)} NOVA. جميع الحقوق محفوظة.</span>
        <span>الأسعار والبيانات المعروضة توضيحية لأغراض العرض فقط.</span>
      </div>
    </footer>`;
}

export function favoriteLabel(pressed) {
  return pressed ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة';
}

export function renderFavoriteButton(id, className = 'fav-btn') {
  const pressed = isFavorite(id);
  return `<button type="button" class="${className}" data-favorite-toggle data-id="${escapeHtml(id)}" aria-pressed="${pressed}" aria-label="${favoriteLabel(pressed)}" title="${favoriteLabel(pressed)}">${icon('heart')}</button>`;
}

function specsFor(property) {
  const specs = [{ icon: 'area', label: formatArea(property.area), name: 'المساحة' }];
  if (property.beds != null) specs.push({ icon: 'bed', label: `${formatNumber(property.beds)} غرف`, name: 'غرف النوم' });
  if (property.baths != null) specs.push({ icon: 'bath', label: `${formatNumber(property.baths)} حمامات`, name: 'الحمامات' });
  return specs;
}

export function priceText(property) {
  return property.purpose === 'rent' ? `${formatPrice(property.price)} / شهريًا` : formatPrice(property.price);
}

export function renderPropertyCard(property, { delay = 0, removable = false } = {}) {
  const id = escapeHtml(property.id);
  const specs = specsFor(property)
    .map((spec) => `<li title="${spec.name}">${icon(spec.icon)}<span>${spec.label}</span></li>`)
    .join('');
  const removeButton = removable
    ? `<button type="button" class="btn btn-outline btn-sm" data-remove-favorite data-id="${id}">${icon('trash')}<span>إزالة</span></button>`
    : '';
  return `
    <article class="property-card" style="--delay: ${delay}ms">
      <div class="property-media">
        <img src="${escapeHtml(property.cover)}" alt="${escapeHtml(property.gallery[0].alt)}" loading="lazy" decoding="async" width="940" height="650" data-fallback />
        <span class="badge badge-purpose badge-${property.purpose}">${PURPOSE_LABELS[property.purpose]}</span>
        ${renderFavoriteButton(property.id)}
      </div>
      <div class="property-body">
        <p class="property-type">${TYPE_LABELS[property.type]}</p>
        <h3 class="property-title"><a href="property-details.html?id=${id}">${escapeHtml(property.title)}</a></h3>
        <p class="property-location">${icon('pin')}<span>${escapeHtml(property.location)}، ${escapeHtml(property.governorate)}</span></p>
        <p class="property-price">${priceText(property)}</p>
        <ul class="property-specs">${specs}</ul>
        <div class="property-actions">
          <a class="btn btn-outline btn-sm" href="property-details.html?id=${id}">عرض التفاصيل ${icon('arrowLeft')}</a>
          ${removeButton}
        </div>
      </div>
    </article>`;
}

export function populateSelect(select, items, placeholder) {
  const options = [`<option value="">${escapeHtml(placeholder)}</option>`];
  for (const [value, label] of items) {
    options.push(`<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`);
  }
  select.innerHTML = options.join('');
}

let toastRegion = null;

export function showToast(message, tone = 'info') {
  if (!toastRegion) {
    toastRegion = document.createElement('div');
    toastRegion.className = 'toast-region';
    toastRegion.setAttribute('role', 'status');
    toastRegion.setAttribute('aria-live', 'polite');
    document.body.append(toastRegion);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${tone}`;
  toast.textContent = message;
  toastRegion.append(toast);
  setTimeout(() => toast.classList.add('is-leaving'), 3000);
  setTimeout(() => toast.remove(), 3400);
}
