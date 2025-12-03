import { getValidationRegex, isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string has the format of a Semantic Version (1.0.0 or v1.0.0).
 * @param {string} str - String to be validated
 * @returns {ValidationResult} Validation result object
 */
export function validateSemVer(str) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const testStr = toString(str).trim();

  const lang = '';

  try {
    const regex = getValidationRegex(lang, 'isSemVer');
    if (!regex) {
      return { valid: false, error: 'invalidRule', context: { rule: 'isSemVer' } };
    }

    if (regex.test(testStr)) {
      return { valid: true };
    } else {
      return { valid: false, error: 'validateSemVer' };
    }
  } catch {
    return { valid: false, error: 'genericError' };
  }
}
