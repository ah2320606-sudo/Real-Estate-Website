import { icon } from './components.js';
import { formatNumber } from './format.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

export function renderGalleryMarkup(slides) {
  const thumbs = slides
    .map(
      (slide, index) => `
        <button type="button" class="thumb" data-gallery-thumb="${index}" aria-label="عرض الصورة ${index + 1}" aria-current="${index === 0}">
          <img src="${escapeAttr(slide.thumb)}" alt="" loading="lazy" decoding="async" data-fallback />
        </button>`,
    )
    .join('');
  return `
    <div class="gallery">
      <div class="gallery-main">
        <button type="button" class="gallery-open" data-gallery-open aria-label="تكبير الصورة">
          <img data-gallery-image src="${escapeAttr(slides[0].src)}" alt="${escapeAttr(slides[0].alt)}" data-fallback />
        </button>
        <button type="button" class="gallery-nav prev" data-gallery-prev aria-label="الصورة السابقة">${icon('chevronLeft')}</button>
        <button type="button" class="gallery-nav next" data-gallery-next aria-label="الصورة التالية">${icon('chevronRight')}</button>
        <span class="gallery-counter" data-gallery-counter></span>
      </div>
      <div class="gallery-thumbs">${thumbs}</div>
    </div>
    <dialog class="lightbox" data-lightbox aria-label="معرض صور العقار">
      <div class="lightbox-inner">
        <button type="button" class="lightbox-close" data-lightbox-close aria-label="إغلاق المعرض">${icon('close')}</button>
        <figure class="lightbox-figure">
          <img data-lightbox-image src="${escapeAttr(slides[0].src)}" alt="${escapeAttr(slides[0].alt)}" data-fallback />
          <figcaption data-lightbox-caption></figcaption>
        </figure>
        <div class="lightbox-controls">
          <button type="button" class="btn btn-light btn-sm" data-lightbox-prev>${icon('chevronLeft')}<span>السابقة</span></button>
          <span class="lightbox-counter" data-lightbox-counter></span>
          <button type="button" class="btn btn-light btn-sm" data-lightbox-next><span>التالية</span>${icon('chevronRight')}</button>
        </div>
      </div>
    </dialog>`;
}

export function mountGallery(root, slides) {
  const mainImage = root.querySelector('[data-gallery-image]');
  const counter = root.querySelector('[data-gallery-counter]');
  const thumbs = [...root.querySelectorAll('[data-gallery-thumb]')];
  const dialog = root.querySelector('[data-lightbox]');
  const lightboxImage = root.querySelector('[data-lightbox-image]');
  const lightboxCaption = root.querySelector('[data-lightbox-caption]');
  const lightboxCounter = root.querySelector('[data-lightbox-counter]');
  const total = slides.length;
  let index = 0;

  function swapImage(img, slide) {
    const apply = () => {
      img.src = slide.src;
      img.alt = slide.alt;
      img.classList.remove('is-swapping');
    };
    if (reducedMotion.matches) {
      apply();
      return;
    }
    img.classList.add('is-swapping');
    window.setTimeout(apply, 200);
  }

  function countText(position) {
    return `${formatNumber(position + 1)} / ${formatNumber(total)}`;
  }

  function show(next) {
    index = (next + total) % total;
    swapImage(mainImage, slides[index]);
    counter.textContent = countText(index);
    thumbs.forEach((thumb, thumbIndex) => thumb.setAttribute('aria-current', String(thumbIndex === index)));
    thumbs[index].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    if (dialog.open) renderLightbox();
  }

  function renderLightbox() {
    swapImage(lightboxImage, slides[index]);
    lightboxCaption.textContent = slides[index].alt;
    lightboxCounter.textContent = countText(index);
  }

  root.querySelector('[data-gallery-prev]').addEventListener('click', () => show(index - 1));
  root.querySelector('[data-gallery-next]').addEventListener('click', () => show(index + 1));
  thumbs.forEach((thumb, thumbIndex) => thumb.addEventListener('click', () => show(thumbIndex)));

  root.querySelector('[data-gallery-open]').addEventListener('click', () => {
    renderLightbox();
    dialog.showModal();
    dialog.querySelector('[data-lightbox-close]').focus();
  });
  dialog.querySelector('[data-lightbox-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-lightbox-prev]').addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-lightbox-next]').addEventListener('click', () => show(index + 1));
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') show(index - 1);
    if (event.key === 'ArrowLeft') show(index + 1);
  });

  show(0);
}

function escapeAttr(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
