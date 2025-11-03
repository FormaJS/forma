import { isString, toString, escapeRegExp } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string contains ONLY characters from a whitelist.
 * @param {string} str - The string to validate.
 * @param {object} [options={}] - Validation options.
 * @param {string} [options.chars] - String of allowed characters.
 * @param {boolean} [options.strict=true] - If true (default), the search is case-sensitive.
 * @returns {ValidationResult} Validation result object.
 */
export function validateIsWhitelisted(str, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const { chars, strict = true } = options;
    if (!isString(chars) || chars.length === 0) {
        return { valid: false, error: 'invalidRule', context: { rule: 'isWhitelisted(chars)' } };
    }

    const testStr = toString(str);
    const flags = strict ? '' : 'i';

    const escapedChars = escapeRegExp(chars);
    const regex = new RegExp(`[^${escapedChars}]`, flags);

    const match = testStr.match(regex);
    if (match) {
        return { valid: false, error: 'validateIsWhitelisted', context: { char: match[0] } };
    }

    return { valid: true };
}
