import { getValidationRegex, isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string has the format of a MIME Type (e.g., 'application/json').
 * @param {string} str - String to be validated
 * @returns {ValidationResult} Validation result object
 */
export function validateMimeType(str) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const testStr = toString(str).trim();

    const lang = '';

    try {
        const regex = getValidationRegex(lang, 'isMimeType');
        if (!regex) {
            return { valid: false, error: 'invalidRule', context: { rule: 'isMimeType' } };
        }

        if (regex.test(testStr)) {
            return { valid: true };
        } else {
            return { valid: false, error: 'validateMimeType' };
        }
    } catch {
        return { valid: false, error: 'genericError' };
    }
}
