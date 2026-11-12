const numberFormat = new Intl.NumberFormat('ar-EG');

export const formatNumber = (value) => numberFormat.format(value);

export const formatPrice = (value) => `${numberFormat.format(value)} جنيه`;

export const formatArea = (value) => `${numberFormat.format(value)} م²`;

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
