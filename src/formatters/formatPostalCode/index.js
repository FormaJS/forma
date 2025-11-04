import { toString } from '../../utils/toString/index.js';
import { getLocaleData } from '../../i18n/index.js';

/**
 * Applies a format mask to a string of digits.
 * @param {string} digits - The string of digits (e.g., "09010140")
 * @param {string} mask - The format (e.g., "#####-###")
 * @returns {string} (e.g., "09010-140")
 */
function _applyFormatMask(digits, mask) {
    let i = 0;
    let result = '';

    for (const maskChar of mask) {
        if (i >= digits.length) {
            break;
        }
        if (maskChar === '#') {
            result += digits[i++];
        } else {
            result += maskChar;
        }
    }
    return result;
}

/**
 * Applies postal code formatting mask (locale-aware) to a string of digits.
 * @param {string} str - The string to be formatted (e.g., "09010140").
 * @param {object} [options={}] - Options (must contain 'locale').
 * @returns {string} The formatted string (e.g., "09010-140") or the digit string
 * if no format is applicable.
 */
export function formatPostalCode(str, options = {}) {
    const digits = toString(str).replace(/\D/g, '');

    const lang = options.locale;
    if (!lang) {
        return digits;
    }

    const localeData = getLocaleData(lang);
    const maskObj = localeData?.masks?.postalcode;

    if (!maskObj || typeof maskObj !== 'object') {
        return digits;
    }

    const mask = maskObj.default;

    if (!mask) {
        return digits;
    }

    const expectedDigits = (mask.match(/#/g) || []).length;

    if (digits.length === expectedDigits) {
        return _applyFormatMask(digits, mask);
    }

    return digits;
}
