import { isString, toString } from '../../utils/index.js';
import { uppercaseRegex, lowercaseRegex, numbersRegex, symbolsRegex } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates the strength of a password based on configurable rules.
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options
 * @param {number} [options.minLength=8] - Minimum length.
 * @param {number} [options.maxLength] - Maximum length.
 * @param {number} [options.minLowercase=1] - Minimum number of lowercase letters.
 * @param {number} [options.minUppercase=1] - Minimum number of uppercase letters.
 * @param {number} [options.minNumbers=1] - Minimum number of numbers.
 * @param {number} [options.minSymbols=1] - Minimum number of symbols.
 * @returns {ValidationResult} Validation result object
 */
export function validateStrongPassword(str, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }
    const testStr = toString(str);

    const defaults = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        maxLength: undefined,
    };
    const opt = { ...defaults, ...options };

    if (testStr.length < opt.minLength) {
        return {
            valid: false,
            error: 'validatePasswordMinLength',
            context: { minLength: opt.minLength },
        };
    }

    if (opt.maxLength !== undefined && testStr.length > opt.maxLength) {
        return {
            valid: false,
            error: 'validatePasswordMaxLength',
            context: { maxLength: opt.maxLength },
        };
    }

    if (opt.minLowercase > 0) {
        const count = (testStr.match(lowercaseRegex) || []).length;
        if (count < opt.minLowercase) {
            return {
                valid: false,
                error: 'validatePasswordLowercase',
                context: { minLowercase: opt.minLowercase },
            };
        }
    }

    if (opt.minUppercase > 0) {
        const count = (testStr.match(uppercaseRegex) || []).length;
        if (count < opt.minUppercase) {
            return {
                valid: false,
                error: 'validatePasswordUppercase',
                context: { minUppercase: opt.minUppercase },
            };
        }
    }

    if (opt.minNumbers > 0) {
        const count = (testStr.match(numbersRegex) || []).length;
        if (count < opt.minNumbers) {
            return {
                valid: false,
                error: 'validatePasswordNumbers',
                context: { minNumbers: opt.minNumbers },
            };
        }
    }

    if (opt.minSymbols > 0) {
        const count = (testStr.match(symbolsRegex) || []).length;
        if (count < opt.minSymbols) {
            return {
                valid: false,
                error: 'validatePasswordSymbols',
                context: { minSymbols: opt.minSymbols },
            };
        }
    }

    return { valid: true };
}
