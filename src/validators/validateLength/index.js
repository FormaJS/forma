import { toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates the number of characters in a string.
 * @param {string} str - The string to validate.
 * @param {object} [options={}] - Options (e.g., { min: 10, max: 100 })
 * @returns {ValidationResult} Validation result object
 */
export function validateLength(str, options = {}) {
    const testStr = toString(str);
    const len = testStr.length;

    const { min = 0, max } = options;

    if (typeof max !== 'undefined' && min === max) {
        if (len !== min) {
            return { valid: false, error: 'validateLengthExact', context: { min } };
        }
        return { valid: true };
    }

    if (len < min) {
        return { valid: false, error: 'validateLengthMin', context: { min } };
    }

    if (typeof max !== 'undefined' && len > max) {
        return { valid: false, error: 'validateLengthMax', context: { max } };
    }

    return { valid: true };
}
