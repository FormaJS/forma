import { isString, toString, luhnCheck, getValidationRegex } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Converts the ISIN string (with letters) to a purely numeric string for the Luhn checksum. (A=10, B=11, ...)
 * @param {string} str - The ISIN (e.g., US0378331005)
 * @returns {string} (e.g., 20280378331005)
 */
function _convertISINToNumeric(str) {
    return str.replace(/[A-Z]/g, (char) => {
        return (char.charCodeAt(0) - 55).toString();
    });
}

/**
 * Validates if the string is a valid ISIN (International Securities Identification Number).
 * @param {string} str - String to be validated
 * @returns {ValidationResult} Validation result object
 */
export function validateISINCode(str) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const testStr = toString(str).trim().toUpperCase();

    const lang = '';

    try {
        const regex = getValidationRegex(lang, 'isISINCode');
        if (!regex) {
            return { valid: false, error: 'invalidRule', context: { rule: 'isISINCode' } };
        }

        if (!regex.test(testStr)) {
            return { valid: false, error: 'validateISINCodeFormat' };
        }

        const numericStr = _convertISINToNumeric(testStr);
        if (!luhnCheck(numericStr)) {
            return { valid: false, error: 'validateISINCodeChecksum' };
        }

        return { valid: true };
    } catch (e) {
        return { valid: false, error: 'genericError', context: { details: e.message } };
    }
}
