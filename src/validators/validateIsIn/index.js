import { isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is present in an array of allowed values.
 * @param {string} str - String to validate
 * @param {Array<string|number>} comparisonArray - The array of allowed values.
 * @param {object} [options={}] - Options
 * @param {boolean} [options.strict=true] - If true, the search is case-sensitive.
 * @param {boolean} [options.ignoreWhitespace=false] - If true, ignores whitespace.
 * @returns {ValidationResult} Validation result object
 */
export function validateIsIn(str, comparisonArray, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  if (!Array.isArray(comparisonArray)) {
    return { valid: false, error: 'invalidRule', context: { rule: 'isIn(array)' } };
  }

  const { strict = true, ignoreWhitespace = false } = options;

  let testStr = toString(str);
  if (ignoreWhitespace) {
    testStr = testStr.trim();
  }
  if (strict === false) {
    testStr = testStr.toLowerCase();
  }

  const allowedValues = comparisonArray.map((item) => {
    let normalizedItem = toString(item);
    if (ignoreWhitespace) {
      normalizedItem = normalizedItem.trim();
    }
    if (strict === false) {
      normalizedItem = normalizedItem.toLowerCase();
    }
    return normalizedItem;
  });

  if (allowedValues.includes(testStr)) {
    return { valid: true };
  } else {
    const contextSeed =
      comparisonArray.slice(0, 10).join(', ') + (comparisonArray.length > 10 ? '...' : '');

    return {
      valid: false,
      error: 'validateIsIn',
      context: { allowed: contextSeed },
    };
  }
}
