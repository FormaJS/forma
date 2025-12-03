import { isString, toString, escapeRegExp } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string does NOT contain characters or words from a blacklist.
 * @param {string} str - The string to validate.
 * @param {object} [options={}] - Validation options.
 * @param {string} [options.chars] - String of forbidden characters.
 * @param {string[]} [options.words] - Array of forbidden substrings.
 * @param {boolean} [options.strict=true] - If true (default), the search is case-sensitive.
 * @returns {ValidationResult} Validation result object.
 */
export function validateIsBlacklisted(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const testStr = toString(str);
  const { chars, words, strict = true } = options;

  const flags = strict ? '' : 'i';

  if (isString(chars) && chars.length > 0) {
    const escapedChars = escapeRegExp(chars);
    const regex = new RegExp(`[${escapedChars}]`, flags);

    if (regex.test(testStr)) {
      return { valid: false, error: 'validateIsBlacklistedChars' };
    }
  }

  if (Array.isArray(words) && words.length > 0) {
    const escapedWords = words.map((word) => escapeRegExp(toString(word)));
    const regex = new RegExp(`(${escapedWords.join('|')})`, flags);

    const match = testStr.match(regex);
    if (match) {
      return {
        valid: false,
        error: 'validateIsBlacklistedWords',
        context: { word: match[0] },
      };
    }
  }

  return { valid: true };
}
