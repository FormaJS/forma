import { isString, toString, executeI18nValidationRule } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is a valid MAC address, testing against allowed formats.
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options
 * @param {boolean} [options.allowColons=true] - If true, allows colon-separated format (e.g., 00:1A:2B:3C:4D:5E).
 * @param {boolean} [options.allowHyphens=true] - If true, allows hyphen-separated format (e.g., 00-1A-2B-3C-4D-5E).
 * @param {boolean} [options.allowDots=true] - If true, allows dot-separated format (e.g., 001A.2B3C.4D5E).
 * @returns {ValidationResult} Validation result object
 */
export async function validateMACAddress(str, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const defaults = {
        allowColons: true,
        allowHyphens: true,
        allowDots: true,
    };

    const opt = { ...defaults, ...options };

    const s = toString(str).trim();
    if (s === '') {
        return { valid: false, error: 'isEmpty' };
    }

    const locale = opt.locale;

    if (opt.allowColons) {
        const res = await executeI18nValidationRule(locale, 'isMACAddress', s, { subKey: 'COLON' });
        if (res && typeof res === 'object' && res.error === 'invalidRule') {
            return { valid: false, error: 'invalidRule', context: { rule: 'isMACAddress:COLON' } };
        }
        if ((res && res.valid) || res === true) return { valid: true };
    }

    if (opt.allowHyphens) {
        const res = await executeI18nValidationRule(locale, 'isMACAddress', s, {
            subKey: 'HYPHEN',
        });
        if (res && typeof res === 'object' && res.error === 'invalidRule') {
            return { valid: false, error: 'invalidRule', context: { rule: 'isMACAddress:HYPHEN' } };
        }
        if ((res && res.valid) || res === true) return { valid: true };
    }

    if (opt.allowDots) {
        const res = await executeI18nValidationRule(locale, 'isMACAddress', s, { subKey: 'DOT' });
        if (res && typeof res === 'object' && res.error === 'invalidRule') {
            return { valid: false, error: 'invalidRule', context: { rule: 'isMACAddress:DOT' } };
        }
        if ((res && res.valid) || res === true) return { valid: true };
    }

    return { valid: false, error: 'validateMACAddressFormat' };
}
