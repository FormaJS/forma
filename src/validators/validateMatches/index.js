import { isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string matches a custom RegEx pattern.
 * @param {string} str - String to validate
 * @param {string|RegExp} pattern - The RegEx pattern (as string or RegExp object).
 * @param {object} [options={}] - Options
 * @param {string} [options.flags] - RegEx flags (e.g., 'i', 'g') if pattern is a string.
 * @returns {ValidationResult} Validation result object
 */
export function validateMatches(str, pattern, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const testStr = toString(str);
    const { flags } = options;

    try {
        let regex;

        if (pattern instanceof RegExp) {
            regex = pattern;
        } else if (isString(pattern)) {
            regex = new RegExp(pattern, flags);
        } else {
            return { valid: false, error: 'validateMatchesInvalid' };
        }

        if (regex.test(testStr)) {
            return { valid: true };
        } else {
            return { valid: false, error: 'validateMatches' };
        }
    } catch (e) {
        return { valid: false, error: 'validateMatchesInvalid', context: { details: e.message } };
    }
}
