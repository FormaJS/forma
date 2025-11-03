import { isString, toString, executeI18nValidationRule } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string contains only hexadecimal characters (0-9, A-F).
 * @param {string} str - String to validate
 * @returns {ValidationResult} Validation result object
 */
export async function validateHexadecimal(str) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const testStr = toString(str);
    const lang = '';

    try {
        const res = await executeI18nValidationRule(lang, 'isHexadecimal', testStr);
        if (res && res.error === 'invalidRule') {
            return { valid: false, error: 'invalidRule', context: { rule: 'isHexadecimal' } };
        }

        const matched = (res && res.valid) || res === true;
        if (matched) return { valid: true };
        return { valid: false, error: 'validateHexadecimal' };
    } catch (e) {
        return { valid: false, error: 'genericError', context: { details: e && e.message } };
    }
}
