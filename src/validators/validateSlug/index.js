import { isString, toString, escapeRegExp } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is in a valid "slug" format.
 * (alphanumeric, separated by hyphen/underscore, no accents).
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options
 * @param {string} [options.separator='-'] - The allowed separator.
 * @param {boolean} [options.requireLowercase=true] - If true, fails if there are uppercase letters.
 * @returns {ValidationResult} Validation result object
 */
export function validateSlug(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }
  const testStr = toString(str);

  if (testStr.trim() === '') {
    return { valid: false, error: 'isEmpty' };
  }

  const { separator = '-', requireLowercase = true } = options;

  const escapedSep = escapeRegExp(separator);

  let charSet = '0-9';
  let flags = 'g';

  if (requireLowercase) {
    charSet += 'a-z';
  } else {
    charSet += 'a-zA-Z';
  }

  const slugRegex = new RegExp(`^[${charSet}]+(${escapedSep}[${charSet}]+)*$`, flags);

  if (slugRegex.test(testStr)) {
    return { valid: true };
  } else {
    return { valid: false, error: 'validateSlug' };
  }
}
