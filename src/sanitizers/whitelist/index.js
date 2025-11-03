import { toString, isString } from '../../utils/index.js';
import { escapeRegExp } from '../../utils/escapeRegExp/index.js';

/**
 * Remove from the string all characters or words that are NOT in the "whitelist".
 * @param {string} str - The string to be cleaned.
 * @param {object} [options={}] - Sanitization options.
 * @param {string} [options.chars] - String of characters to keep.
 * @param {string[]} [options.words] - Array of substrings to keep.
 * @param {boolean} [options.strict=true] - If true (default), the search is case-sensitive.
 * @returns {string} The transformed string.
 */
export function whitelist(str, options = {}) {
    let s = toString(str);
    const { chars, words, strict = true } = options;

    let finalFlags = 'g';
    if (strict === false) {
        finalFlags += 'i';
    }

    if (isString(chars) && chars.length > 0) {
        const escapedChars = escapeRegExp(chars);
        const regex = new RegExp(`[^${escapedChars}]`, finalFlags);
        return s.replace(regex, '');
    }

    if (Array.isArray(words) && words.length > 0) {
        const escapedWords = words.map((word) => escapeRegExp(toString(word)));

        const regex = new RegExp(escapedWords.join('|'), finalFlags);

        const matches = s.match(regex);

        return matches ? matches.join('') : '';
    }

    return '';
}
