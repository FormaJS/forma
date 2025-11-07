import { isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is exactly equal to a comparison value.
 * @param {string} str - String to validate
 * @param {string|number} comparison - The value to compare against.
 * @param {object} [options={}] - Options
 * @param {boolean} [options.strict=true] - If true, the comparison is case-sensitive.
 * @param {boolean} [options.ignoreWhitespace=false] - If true, ignores whitespace at the edges.
 * @returns {ValidationResult} Validation result object
 */
export function validateEqualsTo(str, comparison, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const { strict = true, ignoreWhitespace = false } = options;

  let testStr = toString(str);
  let comparisonStr = toString(comparison);

  if (ignoreWhitespace) {
    testStr = testStr.trim();
    comparisonStr = comparisonStr.trim();
  }

  if (strict === false) {
    testStr = testStr.toLowerCase();
    comparisonStr = comparisonStr.toLowerCase();
  }

  if (testStr === comparisonStr) {
    return { valid: true };
  } else {
    return {
      valid: false,
      error: 'validateEqualsTo',
      context: { comparison: toString(comparison) },
    };
  }
}
