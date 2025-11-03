import { getValidationRegex, isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string contains only ASCII characters.
 * @param {string} str - String to validate
 * @returns {ValidationResult} Validation result object
 */
export function validateAscii(str) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const testStr = toString(str);

    const lang = '';

    try {
        const regex = getValidationRegex(lang, 'isAscii');
        if (!regex) {
            return { valid: false, error: 'invalidRule', context: { rule: 'isAscii' } };
        }

        if (regex.test(testStr)) {
            return { valid: true };
        } else {
            return { valid: false, error: 'validateAscii' };
        }
    } catch {
        return { valid: false, error: 'genericError' };
    }
}
