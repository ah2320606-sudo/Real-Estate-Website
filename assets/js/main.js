import { favoriteLabel, icon, renderFooter, renderHeader, showToast } from './components.js';
import { formatNumber } from './format.js';
import { FAVORITES_EVENT, getFavorites, toggleFavorite } from './store.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.documentElement.classList.add('js');

document.querySelector('[data-site-header]').innerHTML = renderHeader(currentPage);
document.querySelector('[data-site-footer]').innerHTML = renderFooter();

const header = document.querySelector('.site-header');
const menuToggle = header.querySelector('.menu-toggle');
const primaryNav = header.querySelector('#primaryNav');

function setMenuOpen(open) {
  header.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(!header.classList.contains('menu-open'));
});

primaryNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header.classList.contains('menu-open')) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

window.matchMedia('(min-width: 960px)').addEventListener('change', (event) => {
  if (event.matches) setMenuOpen(false);
});

const backToTop = document.createElement('button');
backToTop.type = 'button';
backToTop.className = 'back-to-top';
backToTop.setAttribute('aria-label', 'العودة إلى أعلى الصفحة');
backToTop.innerHTML = icon('up');
document.body.append(backToTop);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
});

function updateOnScroll() {
  header.classList.toggle('is-scrolled', window.scrollY > 16);
  backToTop.classList.toggle('is-visible', window.scrollY > 480);
}

window.addEventListener('scroll', updateOnScroll, { passive: true });
updateOnScroll();

function syncFavorites() {
  const ids = getFavorites();
  document.querySelectorAll('[data-favorites-count]').forEach((element) => {
    element.textContent = formatNumber(ids.length);
  });
  document.querySelectorAll('[data-favorite-toggle]').forEach((button) => {
    const pressed = ids.includes(button.dataset.id);
    button.setAttribute('aria-pressed', String(pressed));
    button.setAttribute('aria-label', favoriteLabel(pressed));
    button.title = favoriteLabel(pressed);
  });
}

window.addEventListener(FAVORITES_EVENT, syncFavorites);
syncFavorites();

document.addEventListener('click', (event) => {
  const favoriteButton = event.target.closest('[data-favorite-toggle]');
  if (favoriteButton) {
    const isFavorite = toggleFavorite(favoriteButton.dataset.id);
    if (isFavorite === null) {
      showToast('تعذر حفظ المفضلة في هذا المتصفح.', 'error');
      return;
    }
    favoriteButton.classList.remove('is-pulsing');
    void favoriteButton.offsetWidth;
    favoriteButton.classList.add('is-pulsing');
    showToast(isFavorite ? 'تمت إضافة العقار إلى المفضلة.' : 'تمت إزالة العقار من المفضلة.', isFavorite ? 'success' : 'info');
    return;
  }

  const demoTrigger = event.target.closest('[data-demo-message]');
  if (demoTrigger) showToast(demoTrigger.dataset.demoMessage, 'info');
});

document.addEventListener('animationend', (event) => {
  if (event.target.classList.contains('is-pulsing')) event.target.classList.remove('is-pulsing');
});

document.addEventListener(
  'error',
  (event) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || !image.hasAttribute('data-fallback') || image.dataset.failed) return;
    image.dataset.failed = 'true';
    image.src = '/placeholder.svg';
  },
  true,
);

function animateCounter(element) {
  const target = Number(element.dataset.count);
  if (!Number.isFinite(target)) return;
  if (reducedMotion.matches) {
    element.textContent = formatNumber(target);
    return;
  }
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    element.textContent = formatNumber(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

queueMicrotask(() => {
  const revealItems = document.querySelectorAll('.reveal');
  const counters = document.querySelectorAll('[data-count]');

  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(
      (entries, instance) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          if (entry.target.hasAttribute('data-count')) animateCounter(entry.target);
          instance.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    revealItems.forEach((item) => observer.observe(item));
    counters.forEach((counter) => observer.observe(counter));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    counters.forEach(animateCounter);
  }
});
