import { toString } from '../../utils/index.js';
import { getLocaleData } from '../../i18n/index.js';

/**
 * Converts a string (locale-aware) to a boolean.
 * @param {string} str - The string to convert (e.g. "yes", "1", "true").
 * @param {object} [options={}] - Options (should include 'locale').
 * @returns {boolean} Returns true if the string is in the locale's truthy list,
 * otherwise returns false.
 */
export function toBoolean(str, options = {}) {
    const testStr = toString(str).trim().toLowerCase();

    const lang = options.locale;
    if (!lang) {
        return false;
    }

    const localeData = getLocaleData(lang);
    const booleanRules = localeData?.validate?.boolean;

    if (!booleanRules) {
        return false;
    }

    const truthyValues = [...(booleanRules.strictTrue || []), ...(booleanRules.looseTrue || [])];

    if (truthyValues.includes(testStr)) {
        return true;
    }

    return false;
}
