import { isString, toString, executeI18nValidationRule } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is a valid hexadecimal color code (with #).
 * @param {string} str - String to validate
 * @returns {ValidationResult} Validation result object
 */
export async function validateHexColor(str) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const testStr = toString(str);
    const lang = '';

    try {
        const res = await executeI18nValidationRule(lang, 'isHexColor', testStr);
        if (res && res.error === 'invalidRule') {
            return { valid: false, error: 'invalidRule', context: { rule: 'isHexColor' } };
        }

        const matched = (res && res.valid) || res === true;
        if (matched) return { valid: true };
        return { valid: false, error: 'validateHexColor' };
    } catch (e) {
        return { valid: false, error: 'genericError', context: { details: e && e.message } };
    }
}
