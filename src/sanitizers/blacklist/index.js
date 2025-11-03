import { toString, isString } from '../../utils/index.js';
import { escapeRegExp } from '../../utils/escapeRegExp/index.js';

/**
 * Replace characters or words from a "blacklist" with a replacement character.
 * By default it removes the matched characters (replaces with '').
 * @param {string} str - The string to be sanitized.
 * @param {object} [options={}] - Sanitization options.
 * @param {string} [options.chars] - String containing characters to be replaced.
 * @param {string[]} [options.words] - Array of substrings to be replaced.
 * @param {string} [options.replacementChar=''] - Character to use as replacement.
 * @param {boolean} [options.strict=true] - If true (default), the search is case-sensitive.
 * @returns {string} The transformed string.
 */
export function blacklist(str, options = {}) {
    let s = toString(str);
    const { chars, words, replacementChar, strict = true } = options;

    let finalFlags = 'g';
    if (strict === false) {
        finalFlags += 'i';
    }

    const baseReplacement = isString(replacementChar) ? replacementChar : '';
    const literalReplacement = baseReplacement.replace(/\$/g, '$$$$');

    if (Array.isArray(words) && words.length > 0) {
        const escapedWords = words.map((word) => escapeRegExp(toString(word)));
        const regex = new RegExp(escapedWords.join('|'), finalFlags);
        s = s.replace(regex, literalReplacement);
    }

    if (isString(chars) && chars.length > 0) {
        const escapedChars = escapeRegExp(chars);
        const regex = new RegExp(`[${escapedChars}]`, finalFlags);
        s = s.replace(regex, literalReplacement);
    }

    return s;
}
