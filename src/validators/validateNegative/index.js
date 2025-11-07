import { validateNumeric } from '../validateNumeric/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is a negative number (< 0).
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options (e.g., { locale: 'pt-BR' })
 * @returns {ValidationResult} Validation result object
 */
export function validateNegative(str, options = {}) {
  const negativeOptions = {
    ...options,
    maxRange: 0,
    strict: true,
  };

  const result = validateNumeric(str, negativeOptions);

  if (!result.valid) {
    if (result.error === 'validateNumericRangeMaxStrict') {
      result.error = 'validateNumericNegative';
      result.context = {};
    }
  }

  return result;
}
