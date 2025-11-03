import { validateNumeric } from '../validateNumeric/index.js';

/**
 * Validates if the string is a decimal number (REQUIRES a decimal part).
 * Rejects "123" but allows "123.45".
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options (minRange, maxRange, locale, etc.)
 * @returns {ValidationResult} Validation result object
 */
export function validateDecimal(str, options = {}) {
    const decimalOptions = {
        ...options,
        allowDecimal: true,
        requireDecimal: true,
    };
    return validateNumeric(str, decimalOptions);
}
