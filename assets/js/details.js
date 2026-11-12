import './main.js';
import { AGENTS, PROPERTIES, PURPOSE_LABELS, TYPE_LABELS, getPropertyById } from './data.js';
import { icon, priceText, renderFavoriteButton, renderPropertyCard } from './components.js';
import { escapeHtml, formatArea, formatNumber, formatPrice } from './format.js';
import { mountGallery, renderGalleryMarkup } from './gallery.js';

const container = document.querySelector('[data-property-details]');
const notFound = document.querySelector('[data-not-found]');
const property = getPropertyById(new URLSearchParams(window.location.search).get('id') ?? '');

if (property) {
  document.title = `${property.title} | NOVA`;
  container.innerHTML = renderDetails(property);
  container.hidden = false;
  mountGallery(container, property.gallery);
} else {
  document.title = 'العقار غير موجود | NOVA';
  notFound.hidden = false;
}

function specsFor(item) {
  const specs = [
    { icon: 'building', name: 'نوع العقار', value: TYPE_LABELS[item.type] },
    { icon: 'check', name: 'نوع العملية', value: PURPOSE_LABELS[item.purpose] },
    { icon: 'area', name: 'المساحة', value: formatArea(item.area) },
  ];
  if (item.beds != null) specs.push({ icon: 'bed', name: 'غرف النوم', value: formatNumber(item.beds) });
  if (item.baths != null) specs.push({ icon: 'bath', name: 'الحمامات', value: formatNumber(item.baths) });
  if (item.floors != null) specs.push({ icon: 'layers', name: 'عدد الطوابق', value: formatNumber(item.floors) });
  if (item.floor != null) {
    const floorText = typeof item.floor === 'number' ? formatNumber(item.floor) : item.floor;
    specs.push({ icon: 'layers', name: 'الطابق', value: floorText });
  }
  specs.push({ icon: 'paint', name: 'التشطيب', value: item.finishing });
  specs.push({ icon: 'calendar', name: 'حالة التسليم', value: item.delivery });
  return specs;
}

function similarTo(item) {
  return PROPERTIES.filter((other) => other.id !== item.id)
    .map((other) => ({ other, score: (other.type === item.type ? 2 : 0) + (other.location === item.location ? 1 : 0) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ other }) => other);
}

function renderDetails(item) {
  const agent = AGENTS[item.agentId];
  const specItems = specsFor(item)
    .map(({ icon: iconName, name, value }) => `
        <div class="spec-item">
          <span class="spec-icon">${icon(iconName)}</span>
          <div><dt>${escapeHtml(name)}</dt><dd>${escapeHtml(value)}</dd></div>
        </div>`)
    .join('');
  const features = item.features.map((feature) => `<li>${icon('check')}<span>${escapeHtml(feature)}</span></li>`).join('');
  const tags = [TYPE_LABELS[item.type], PURPOSE_LABELS[item.purpose], item.finishing, item.delivery]
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join('');
  const priceSub = item.purpose === 'sale' ? `سعر المتر: ${formatPrice(item.pricePerM2)} للمتر المربع` : 'إيجار شهري';
  const whatsappText = encodeURIComponent(`مرحبًا، أستفسر عن العقار ${item.id}: ${item.title}`);
  const similar = similarTo(item);
  const similarSection = similar.length
    ? `
    <section class="similar-section" aria-labelledby="similar-title">
      <div class="section-head">
        <div>
          <span class="eyebrow">عقارات مشابهة</span>
          <h2 id="similar-title" class="section-title">قد يعجبك أيضًا</h2>
        </div>
      </div>
      <div class="card-grid">${similar.map((other, index) => renderPropertyCard(other, { delay: index * 80 })).join('')}</div>
    </section>`
    : '';

  return `
    <nav class="breadcrumb" aria-label="مسار التصفح">
      <ol>
        <li><a href="index.html">الرئيسية</a></li>
        <li><a href="properties.html">العقارات</a></li>
        <li aria-current="page">${escapeHtml(item.id)}</li>
      </ol>
    </nav>

    <header class="details-hero">
      <div class="details-title">
        <h1>${escapeHtml(item.title)}</h1>
        <p>${icon('pin')}<span>${escapeHtml(item.location)}، ${escapeHtml(item.governorate)}</span></p>
        <div class="details-tags">${tags}</div>
      </div>
      <div class="details-actions">
        ${renderFavoriteButton(item.id, 'fav-btn fav-large')}
      </div>
    </header>

    ${renderGalleryMarkup(item.gallery)}

    <div class="details-layout">
      <div class="details-main">
        <section class="details-block" aria-labelledby="desc-title">
          <h2 id="desc-title">عن العقار</h2>
          <p>${escapeHtml(item.description)}</p>
        </section>

        <section class="details-block" aria-labelledby="specs-title">
          <h2 id="specs-title">المواصفات</h2>
          <dl class="spec-grid">${specItems}</dl>
        </section>

        <section class="details-block" aria-labelledby="features-title">
          <h2 id="features-title">أبرز المميزات</h2>
          <ul class="feature-list">${features}</ul>
        </section>

        <section class="details-block" aria-labelledby="location-title">
          <h2 id="location-title">الموقع</h2>
          <p>${escapeHtml(item.location)}، ${escapeHtml(item.governorate)}.</p>
          <p class="location-note">${icon('pin')}<span>الموقع تقريبي على مستوى المنطقة، ويتم تأكيد العنوان الدقيق عند التواصل.</span></p>
        </section>
      </div>

      <aside class="aside-stack" aria-label="السعر والتواصل">
        <div class="price-card">
          <p class="price-main">${priceText(item)}</p>
          <p class="price-sub">${priceSub}</p>
          <p class="disclaimer">السعر توضيحي لأغراض العرض، ولا يمثل عرضًا رسميًا أو توفرًا فعليًا للوحدة.</p>
          <div class="agent-actions">
            <a class="btn btn-gold" href="contact.html">استفسر عن هذا العقار</a>
            <a class="btn btn-outline" href="contact.html">اطلب معاينة</a>
          </div>
        </div>

        ${agent ? `
        <div class="agent-card">
          <div class="agent-head">
            <span class="avatar" aria-hidden="true">${escapeHtml(agent.initials)}</span>
            <div>
              <h2>${escapeHtml(agent.name)}</h2>
              <p class="agent-role">${escapeHtml(agent.role)}</p>
            </div>
          </div>
          <p class="agent-note">بيانات المستشار توضيحية (عرض تجريبي). رابط الواتساب التالي يفتح محادثة فارغة ولا يمثل رقمًا حقيقيًا.</p>
          <div class="agent-actions">
            <a class="btn btn-outline" href="https://wa.me/?text=${whatsappText}" target="_blank" rel="noopener noreferrer">${icon('chat')}<span>مراسلة عبر واتساب</span></a>
          </div>
        </div>` : ''}
      </aside>
    </div>

    ${similarSection}`;
}
