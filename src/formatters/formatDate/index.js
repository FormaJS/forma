import { getLocaleData } from '../../i18n/index.js';

/**
 * Adds a leading zero if the number is less than 10.
 * @param {number} num - The number (e.g., 5)
 * @returns {string} (e.g., "05")
 */
function _pad(num) {
    return num < 10 ? '0' + num : String(num);
}

/**
 * Formats a Date object into a locale-aware string,
 * using the format defined in the i18n file.
 * @param {Date} dateObj - The Date object to format.
 * @param {object} [options={}] - Options (must contain 'locale').
 * @returns {string | null} The formatted string (e.g., "31/10/2025")
 * or 'null' if the input is not a Date object or the locale is invalid.
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
