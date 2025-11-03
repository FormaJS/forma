import { isString, toString, escapeRegExp } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string contains a given substring (seed) and, optionally,
 * how many times it appears.
 * @param {string} str - String to validate
 * @param {string} seed - The substring to search for (comes from '...finalArgs' in Forma.js)
 * @param {object} [options={}] - Options
 * @param {boolean} [options.strict=true] - If true, the search is case-sensitive.
 * @param {boolean} [options.ignoreWhitespace=false] - If true, ignores whitespace.
 * @param {number} [options.minOccurrences] - The minimum number of times the seed must appear.
 * @param {number} [options.maxOccurrences] - The maximum number of times the seed may appear.
 * @returns {ValidationResult} Validation result object
 */
export function validateContains(str, seed, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    if (seed === null || typeof seed === 'undefined') {
        return { valid: false, error: 'invalidRule', context: { rule: 'contains(seed)' } };
    }

    const { strict = true, ignoreWhitespace = false, minOccurrences = 1, maxOccurrences } = options;

    let testStr = toString(str);
    let seedStr = toString(seed);
    const originalSeed = seedStr;

    if (ignoreWhitespace) {
        testStr = testStr.replace(/\s/g, '');
        seedStr = seedStr.replace(/\s/g, '');
    }

    if (strict === false) {
        testStr = testStr.toLowerCase();
        seedStr = seedStr.toLowerCase();
    }

    if (seedStr === '') {
        return minOccurrences === 0
            ? { valid: true }
            : { valid: false, error: 'invalidRule', context: { rule: 'contains(empty_seed)' } };
    }

    const escapedSeed = escapeRegExp(seedStr);
    const flags = strict ? 'g' : 'gi';
    const regex = new RegExp(escapedSeed, flags);

    const matches = testStr.match(regex);
    const count = matches ? matches.length : 0;

    if (count < minOccurrences) {
        return {
            valid: false,
            error: 'validateContainsMin',
            context: { seed: originalSeed, minOccurrences },
        };
    }

    if (typeof maxOccurrences !== 'undefined' && count > maxOccurrences) {
        return {
            valid: false,
            error: 'validateContainsMax',
            context: { seed: originalSeed, maxOccurrences },
        };
    }

    return { valid: true };
}
