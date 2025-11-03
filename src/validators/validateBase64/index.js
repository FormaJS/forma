import { isString, toString, base64Regex, base64UrlSafeRegex } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is a valid Base64 string.
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options
 * @param {boolean} [options.urlSafe=false] - If true, uses the URL-safe alphabet.
 * @returns {ValidationResult} Validation result object
 */
export function validateBase64(str, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const testStr = toString(str);
    const { urlSafe = false } = options;

    if (testStr.length === 0) {
        return { valid: false, error: 'validateBase64' };
    }

    try {
        let regex = urlSafe ? base64UrlSafeRegex : base64Regex;

        // utils may export pattern strings; accept both string and RegExp
        if (typeof regex === 'string') {
            regex = new RegExp(regex);
        }

        if (regex.test(testStr)) {
            return { valid: true };
        } else {
            return { valid: false, error: 'validateBase64' };
        }
    } catch (e) {
        return { valid: false, error: 'genericError', context: { details: e && e.message } };
    }
}
