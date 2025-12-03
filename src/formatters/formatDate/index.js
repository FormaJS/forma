import { getLocaleData } from '../../i18n/index.js';

/**
 * Adds a leading zero if the number is less than 10.
 * @param {number} num - The number (e.g., 5)
 * @returns {string} (e.g., "05")
 */
function _pad(num) {
  return String(num).padStart(2, '0');
}
/**
 * Formats a Date using the active locale's date pattern.
 * @param {Date} dateObj - Date to format
 * @param {{ locale?: string }} [options] - Formatting options
 * @returns {string|null} Formatted string or null if invalid
 */
export function formatDate(dateObj, options = {}) {
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return null;
  }

  const lang = options.locale;
  if (!lang) {
    return null;
  }

  const localeData = getLocaleData(lang);
  const formatString = localeData?.date?.format;

  if (!formatString) {
    return null;
  }

  const d = dateObj.getUTCDate();
  const M = dateObj.getUTCMonth() + 1;
  const y = dateObj.getUTCFullYear();

  return formatString
    .replace(/yyyy/g, y)
    .replace(/yy/g, _pad(y % 100))
    .replace(/mm/g, _pad(M))
    .replace(/m/g, M)
    .replace(/dd/g, _pad(d))
    .replace(/d/g, d);
}
