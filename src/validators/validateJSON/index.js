import { isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is a valid JSON string.
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options
 * @param {boolean} [options.allowPrimitives=true] - If false, fails if the JSON is
 * a primitive (string, number, boolean, null) instead of an Object or Array.
 * @returns {ValidationResult} Validation result object
 */
export function validateJSON(str, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const testStr = toString(str);

    if (testStr.trim() === '') {
        return { valid: false, error: 'isEmpty' };
    }

    let parsed;
    try {
        parsed = JSON.parse(testStr);
    } catch {
        return { valid: false, error: 'validateJSON' };
    }

    const { allowPrimitives = true } = options;

    if (allowPrimitives) {
        return { valid: true };
    }

    if (parsed !== null && typeof parsed === 'object') {
        return { valid: true };
    } else {
        return { valid: false, error: 'validateJSONNotObject' };
    }
}
