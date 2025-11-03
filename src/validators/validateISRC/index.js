import { getValidationRegex, isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

// RegEx to sanitize (remove hyphens)
const sanitizeRegex = /-/g;

/**
 * Validates if the string is a valid ISRC (International Standard Recording Code).
 * @param {string} str - String to be validated
 * @returns {ValidationResult} Validation result object
 */
export function validateISRC(str) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const testStr = toString(str).replace(sanitizeRegex, '').trim();

    const lang = '';

    try {
        const regex = getValidationRegex(lang, 'isISRC');
        if (!regex) {
            return { valid: false, error: 'invalidRule', context: { rule: 'isISRC' } };
        }

        if (regex.test(testStr)) {
            return { valid: true };
        } else {
            return { valid: false, error: 'validateISRC' };
        }
    } catch {
        return { valid: false, error: 'genericError' };
    }
}
