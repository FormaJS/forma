import { validateNumeric } from '../validateNumeric/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is a positive number (> 0).
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options (e.g., { locale: 'pt-BR' })
 * @returns {ValidationResult} Validation result object
 */
export function validatePositive(str, options = {}) {
  const positiveOptions = {
    ...options,
    minRange: 0,
    strict: true,
  };

  const result = validateNumeric(str, positiveOptions);

  if (!result.valid) {
    if (result.error === 'validateNumericRangeMinStrict') {
      result.error = 'validateNumericPositive';
      result.context = {};
    }
  }

  return result;
}
