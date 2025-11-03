import { validateInt } from '../validateInt/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is a valid port number (0-65535).
 * @param {string} str - String to validate
 * @returns {ValidationResult} Validation result object
 */
export function validatePort(str) {
    const portOptions = {
        minRange: 0,
        maxRange: 65535,
        strict: false,
    };

    const result = validateInt(str, portOptions);

    if (!result.valid) {
        if (
            result.error === 'validateNumericRangeMin' ||
            result.error === 'validateNumericRangeMax' ||
            result.error === 'validateNumericRangeMinStrict' ||
            result.error === 'validateNumericRangeMaxStrict'
        ) {
            result.error = 'validatePortRange';
            result.context = {};
        }
    }

    return result;
}
