import { isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 */

/**
 * Validates if a string is empty (considering whitespace).
 * @param {string} str - The string to validate.
 * @returns {ValidationResult} Validation result object
 */
export function validateNotEmpty(str) {
    if (!isString(str)) {
        const testStr = toString(str).trim();

        if (testStr.length === 0) {
            return { valid: false, error: 'isEmpty' };
        }
    } else {
        const testStr = str.trim();

        if (testStr.length === 0) {
            return { valid: false, error: 'isEmpty' };
        }
    }

    return { valid: true };
}
