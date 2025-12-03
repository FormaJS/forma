import { validateNumeric } from '../validateNumeric/index.js';

/**
 * Validates if the string is a valid integer (does NOT allow decimals).
 * Allows "123" but rejects "123.45".
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options (minRange, maxRange, locale, etc.)
 * @returns {ValidationResult} Validation result object
 */
export function validateInt(str, options = {}) {
  const intOptions = {
    ...options,
    allowDecimal: false,
  };
  return validateNumeric(str, intOptions);
}
