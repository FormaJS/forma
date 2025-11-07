import { validateNumeric } from '../validateNumeric/index.js';

/**
 * Validates if the string is a valid floating-point number (integer OR decimal).
 * Allows "123" and "123.45".
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options (minRange, maxRange, locale, etc.)
 * @returns {ValidationResult} Validation result object
 */
export function validateFloat(str, options = {}) {
  const floatOptions = {
    ...options,
    allowDecimal: true,
    requireDecimal: false,
  };
  return validateNumeric(str, floatOptions);
}
