import { isString } from '../../utils/index.js';
import { getNormalizedNumberString } from '../../utils/getNormalizedNumberString/index.js';
import { validateNumeric } from '../validateNumeric/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the number represented by the string is divisible by a divisor.
 * @param {string} str - String to validate (e.g., "1.200,50")
 * @param {number} divisor - The number to divide by (comes from '...finalArgs').
 * @param {object} [options={}] - Options (must contain 'locale')
 * @returns {ValidationResult} Validation result object
 */
export function validateDivisibleBy(str, divisor, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const divisorNum = Number(divisor);
    if (typeof divisor !== 'number' || !isFinite(divisorNum) || divisorNum === 0) {
        return { valid: false, error: 'validateDivisibleByDivisor' };
    }

    const numericResult = validateNumeric(str, {
        ...options,
        allowDecimal: true,
    });

    if (!numericResult.valid) {
        return numericResult;
    }

    const normalizedStr = getNormalizedNumberString(str, options.locale);
    const valueNum = parseFloat(normalizedStr);

    if (isNaN(valueNum)) {
        return { valid: false, error: 'validateNumericInvalid' };
    }

    if (valueNum % divisorNum === 0) {
        return { valid: true };
    } else {
        return {
            valid: false,
            error: 'validateDivisibleBy',
            context: { divisor: divisorNum },
        };
    }
}
