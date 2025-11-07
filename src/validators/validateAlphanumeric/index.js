import {
  getValidationRegex,
  isString,
  toString,
  escapeRegExpCharClass,
} from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string contains only alphanumeric characters (according to the locale).
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options
 * @param {string} [options.locale] - Locale (required) to fetch the 'alphanumeric' rule.
 * @param {boolean} [options.ignoreSpace=false] - If true, spaces are ignored.
 * @param {string} [options.ignoredChars=''] - String of characters to ignore.
 * @returns {ValidationResult} Validation result object
 */
export function validateAlphanumeric(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const lang = options.locale;
  if (!lang) {
    return { valid: false, error: 'localeRequired' };
  }

  let testStr = toString(str);
  const { ignoreSpace = false, ignoredChars = '' } = options;

  try {
    const regex = getValidationRegex(lang, 'alphanumeric', options);
    if (!regex) {
      return { valid: false, error: 'invalidRule', context: { rule: 'alphanumeric' } };
    }

    if (ignoreSpace) {
      testStr = testStr.replace(/ /g, '');
    }

    if (isString(ignoredChars) && ignoredChars.length > 0) {
      const escaped = escapeRegExpCharClass(ignoredChars);
      const ignoreRegex = new RegExp(`[${escaped}]`, 'g');
      testStr = testStr.replace(ignoreRegex, '');
    }

    if (regex.test(testStr)) {
      return { valid: true };
    } else {
      return { valid: false, error: 'validateAlphanumeric' };
    }
  } catch {
    return { valid: false, error: 'genericError' };
  }
}
