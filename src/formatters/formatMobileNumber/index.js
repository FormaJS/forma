import { toString, applyFormatMask } from '../../utils/index.js';
import { getLocaleData } from '../../i18n/index.js';

/**
 * Applies a locale-aware mobile number formatting mask.
 * @param {string} str - The string to format (e.g., "11987654321").
 * @param {object} [options={}] - Options.
 * @param {string} [options.format='local'] - The format ('local' or 'international').
 * @returns {string} The formatted string (e.g., "(11) 98765-4321") or the digits string.
 */
export function formatMobileNumber(str, options = {}) {
    const digits = toString(str).replace(/\D/g, '');

    const lang = options.locale;
    const defaults = { format: 'local' };
    const opt = { ...defaults, ...options };

    if (!lang) {
        return digits;
    }

    const localeData = getLocaleData(lang);
    const maskObject = localeData?.masks?.mobileNumber;

    if (!maskObject || typeof maskObject !== 'object') {
        return digits;
    }

    let mask = maskObject[opt.format];

    if (!mask) {
        mask = maskObject['local'];
        if (!mask) return digits;
    }

    const expectedDigits = (mask.match(/#/g) || []).length;

    if (digits.length === expectedDigits) {
        return applyFormatMask(digits, mask);
    }

    return digits;
}
