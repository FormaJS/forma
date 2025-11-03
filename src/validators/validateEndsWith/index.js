import { isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string ends with a given substring (seed).
 * @param {string} str - String to validate
 * @param {string} seed - The substring to search for at the end.
 * @param {object} [options={}] - Options
 * @param {boolean} [options.strict=true] - If true, the search is case-sensitive.
 * @param {boolean} [options.ignoreWhitespace=false] - If true, ignores trailing spaces.
 * @returns {ValidationResult} Validation result object
 */
export function validateEndsWith(str, seed, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    if (seed === null || typeof seed === 'undefined') {
        return { valid: false, error: 'invalidRule', context: { rule: 'endsWith(seed)' } };
    }

    const { strict = true, ignoreWhitespace = false } = options;

    let testStr = toString(str);
    let seedStr = toString(seed);

    if (ignoreWhitespace) {
        testStr = testStr.trimEnd();
        seedStr = seedStr.trim();
    }

    if (strict === false) {
        testStr = testStr.toLowerCase();
        seedStr = seedStr.toLowerCase();
    }

    if (testStr.endsWith(seedStr)) {
        return { valid: true };
    } else {
        return { valid: false, error: 'validateEndsWith', context: { seed: toString(seed) } };
    }
}
