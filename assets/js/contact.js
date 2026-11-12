import './main.js';
import { icon } from './components.js';
import { SITE } from './data.js';
import { escapeHtml } from './format.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^(\+20|0020|0)?1[0125]\d{8}$/;

const form = document.querySelector('#contactForm');
const formView = document.querySelector('[data-form-view]');
const successView = document.querySelector('[data-form-success]');

document.querySelector('[data-contact-info]').innerHTML = [
  { icon: 'mail', label: 'البريد الإلكتروني', value: SITE.email },
  { icon: 'phone', label: 'الهاتف', value: SITE.phone },
  { icon: 'pin', label: 'العنوان', value: SITE.address },
]
  .map(
    ({ icon: iconName, label, value }) => `
      <div class="contact-item">
        <span class="spec-icon">${icon(iconName)}</span>
        <div>
          <strong>${escapeHtml(label)}</strong>
          <span>${escapeHtml(value)}</span>
        </div>
      </div>`,
  )
  .join('');

const RULES = {
  name: {
    check: (value) => value.length >= 3,
    message: 'يرجى إدخال الاسم الكامل (3 أحرف على الأقل).',
  },
  email: {
    check: (value) => EMAIL_PATTERN.test(value),
    message: 'يرجى إدخال بريد إلكتروني صحيح، مثال: name@example.com',
  },
  phone: {
    check: (value) => PHONE_PATTERN.test(value.replace(/[\s-]/g, '')),
    message: 'يرجى إدخال رقم هاتف مصري صحيح، مثال: 01012345678',
  },
  subject: {
    check: (value) => value !== '',
    message: 'يرجى اختيار موضوع الرسالة.',
  },
  message: {
    check: (value) => value.length >= 10,
    message: 'يرجى كتابة رسالة لا تقل عن 10 أحرف.',
  },
};

function fieldFor(name) {
  return form.elements.namedItem(name);
}

function setError(name, message) {
  const field = fieldFor(name);
  const errorEl = document.getElementById(`${field.id}Error`);
  errorEl.textContent = message;
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validateField(name) {
  const value = fieldFor(name).value.trim();
  const rule = RULES[name];
  const valid = rule.check(value);
  setError(name, valid ? '' : rule.message);
  return valid;
}

function validateForm() {
  const results = Object.keys(RULES).map((name) => validateField(name));
  const firstInvalid = Object.keys(RULES).find((name) => fieldFor(name).getAttribute('aria-invalid') === 'true');
  if (firstInvalid) fieldFor(firstInvalid).focus();
  return results.every(Boolean);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateForm()) return;
  formView.hidden = true;
  successView.hidden = false;
});

for (const name of Object.keys(RULES)) {
  fieldFor(name).addEventListener('blur', () => validateField(name));
  fieldFor(name).addEventListener('input', () => {
    if (fieldFor(name).getAttribute('aria-invalid') === 'true') validateField(name);
  });
}

document.querySelector('[data-reset-form]').addEventListener('click', () => {
  form.reset();
  for (const name of Object.keys(RULES)) setError(name, '');
  successView.hidden = true;
  formView.hidden = false;
  fieldFor('name').focus();
});
