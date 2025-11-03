import { getValidationRegex, isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string has the format of an HSL or HSLA color.
 * @param {string} str - String to be validated
 * @returns {ValidationResult} Validation result object
 */
export function validateHSL(str) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const testStr = toString(str).trim();

    const lang = '';

    try {
        const regex = getValidationRegex(lang, 'isHSL');
        if (!regex) {
            return { valid: false, error: 'invalidRule', context: { rule: 'isHSL' } };
        }

        if (regex.test(testStr)) {
            return { valid: true };
        } else {
            return { valid: false, error: 'validateHSL' };
        }
    } catch {
        return { valid: false, error: 'genericError' };
    }
}
