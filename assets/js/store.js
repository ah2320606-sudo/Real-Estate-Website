const STORAGE_KEY = 'nova.favorites';

export const FAVORITES_EVENT = 'nova:favorites-change';

function readIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

function writeIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    return false;
  }
  window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: ids }));
  return true;
}

export function getFavorites() {
  return readIds();
}

export function isFavorite(id) {
  return readIds().includes(id);
}

export function toggleFavorite(id) {
  const ids = readIds();
  const index = ids.indexOf(id);
  const nextIds = index === -1 ? [...ids, id] : ids.filter((item) => item !== id);
  if (!writeIds(nextIds)) return null;
  return index === -1;
}

export function removeFavorite(id) {
  writeIds(readIds().filter((item) => item !== id));
}

window.addEventListener('storage', (event) => {
  if (event.key === STORAGE_KEY) {
    window.dispatchEvent(new CustomEvent(FAVORITES_EVENT, { detail: readIds() }));
  }
});
