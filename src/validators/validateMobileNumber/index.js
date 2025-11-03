import { isString, toString, executeI18nValidationRule } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates mobile number according to locale
 * @param {string} mobile - Number to validate
 * @param {object} [options={}] - Options (e.g., { locale: 'pt-BR' })
 * @returns {ValidationResult} Validation result object
 */
export async function validateMobileNumber(mobile, options = {}) {
    if (!isString(mobile)) {
        return { valid: false, error: 'invalidType' };
    }

    const testStr = toString(mobile).trim();
    const lang = options.locale;
    if (!lang) {
        return { valid: false, error: 'localeRequired' };
    }

    try {
        const res = await executeI18nValidationRule(lang, 'mobilenumber', testStr, options);
        if (res && typeof res === 'object') {
            if (res.valid === true) return { valid: true };
            if (res.error) return res;
            return { valid: false, error: 'validateMobileNumber' };
        }
        if (typeof res === 'boolean') {
            return res ? { valid: true } : { valid: false, error: 'validateMobileNumber' };
        }
        return { valid: false, error: 'genericError' };
    } catch (e) {
        return { valid: false, error: 'genericError', context: { details: e && e.message } };
    }
}
