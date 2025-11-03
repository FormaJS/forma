import { getValidationRegex, isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is a valid postal code (according to the locale).
 * @param {string} str - String to be validated
 * @param {object} [options={}] - Options (must contain 'locale')
 * @returns {ValidationResult} Validation result object
 */
export function validatePostalCode(str, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const testStr = toString(str).trim();
    if (testStr === '') {
        return { valid: false, error: 'isEmpty' };
    }

    const lang = options.locale;
    if (!lang) {
        return { valid: false, error: 'localeRequired' };
    }

    try {
        const regex = getValidationRegex(lang, 'postalcode', options);
        if (!regex) {
            return { valid: false, error: 'invalidRule', context: { rule: 'postalcode' } };
        }

        if (regex.test(testStr)) {
            return { valid: true };
        } else {
            return { valid: false, error: 'validatePostalCode' };
        }
    } catch {
        return { valid: false, error: 'genericError' };
    }
}
