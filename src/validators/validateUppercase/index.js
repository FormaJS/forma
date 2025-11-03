import { validateAlpha } from '../validateAlpha/index.js';
import { isString, toString, escapeRegExp } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string contains only uppercase alphabetic characters (locale-aware).
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options (e.g., { locale: 'pt-BR', ignoreSpace: true })
 * @returns {ValidationResult} Validation result object
 */
export function validateUppercase(str, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const alphaResult = validateAlpha(str, options);
    if (!alphaResult.valid) {
        return alphaResult;
    }

    let testStr = toString(str);
    if (options.ignoreSpace) {
        testStr = testStr.replace(/ /g, '');
    }

    if (isString(options.ignoredChars) && options.ignoredChars.length > 0) {
        const escaped = escapeRegExp(options.ignoredChars);
        const ignoreRegex = new RegExp(`[${escaped}]`, 'g');
        testStr = testStr.replace(ignoreRegex, '');
    }

    if (testStr === testStr.toUpperCase()) {
        return { valid: true };
    } else {
        return { valid: false, error: 'validateUppercase' };
    }
}
