import { getValidationRegex, isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is a valid BIC (SWIFT code).
 * @param {string} str - String to be validated
 * @param {object} [options={}] - Options (must contain 'locale' for getValidationRegex)
 * @returns {ValidationResult} Validation result object
 */
export function validateBIC(str, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const testStr = toString(str).trim();

    const lang = options.locale;
    if (!lang) {
        return { valid: false, error: 'localeRequired' };
    }

    try {
        const regex = getValidationRegex(lang, 'isBIC', options);
        if (!regex) {
            return { valid: false, error: 'invalidRule', context: { rule: 'isBIC' } };
        }

        if (regex.test(testStr)) {
            return { valid: true };
        } else {
            return { valid: false, error: 'validateBIC' };
        }
    } catch {
        return { valid: false, error: 'genericError' };
    }
}
