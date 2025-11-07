import { toString } from '../../utils/toString/index.js';
import { escapeRegExp } from '../../utils/escapeRegExp/index.js';

/**
 * Convert a string into a URL-friendly "slug".
 * @param {string} str - The string to convert.
 * @param {object} [options={}] - Sanitization options.
 * @param {string} [options.separator='-'] - Character used to replace spaces.
 * @param {boolean} [options.lowercase=true] - Convert result to lowercase.
 * @param {boolean} [options.removeDiacritics=true] - Remove diacritics (e.g., á -> a).
 * @param {boolean} [options.removeSpecialChars=true] - Remove non-alphanumeric characters.
 * @returns {string} The transformed (slug) string.
 */
export function toSlug(str, options = {}) {
  let s = toString(str);

  const separator = options.separator || '-';
  const doLowercase = options.lowercase !== false;
  const doRemoveDiacritics = options.removeDiacritics !== false;
  const doRemoveSpecial = options.removeSpecialChars !== false;

  const escapedSep = escapeRegExp(separator);

  if (doLowercase) {
    s = s.toLowerCase();
  }

  if (doRemoveDiacritics) {
    s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  s = s.replace(/\s+/g, separator);

  if (doRemoveSpecial) {
    const flags = doLowercase ? 'g' : 'gi';
    const badChars = new RegExp(`[^a-z0-9${escapedSep}]`, flags);
    s = s.replace(badChars, '');
  }

  const sepDupe = new RegExp(`${escapedSep}+`, 'g');
  s = s.replace(sepDupe, separator);

  const sepStart = new RegExp(`^${escapedSep}+`);
  const sepEnd = new RegExp(`${escapedSep}+$`);
  s = s.replace(sepStart, '').replace(sepEnd, '');

  return s;
}
