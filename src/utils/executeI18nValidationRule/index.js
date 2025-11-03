import { getLocaleData, globalValidations } from '../../i18n/index.js';
import { toString } from '../toString/index.js';
import { getValidationRegex } from '../getValidationRegex/index.js';
import { normalizeLocale } from '../normalizeLocale/index.js';

/**
 * Execute an i18n validation rule for a given locale/key/value.
 *
 * The i18n `validate` entry may be:
 * - a string with a regex pattern
 * - an object describing patterns (handled by getValidationRegex)
 * - the special string `function:ValidatorName` which indicates a validator
 *   function exported from `src/validators/ValidatorName/index.js` (named export
 *   or default export).
 *
 * This util centralizes the logic to run either regex-based or function-based
 * validation rules defined in the locale files.
 *
 * @param {string} locale - Locale key (ex: 'pt-BR' or 'en-US')
 * @param {string} key - Validation key inside i18n (ex: 'taxid', 'mobilenumber')
 * @param {string|any} value - Value to validate
 * @param {object} [options={}] - Optional options forwarded to function validators
 * @returns {Promise<object>} Resolves to a result object similar to other validators: { valid: boolean, error?: string, context?: object }
 */
export async function executeI18nValidationRule(locale, key, value, options = {}) {
    try {
        const i18n = getLocaleData(locale);
        let mask = i18n?.validate?.[key] ?? globalValidations.validate?.[key];

        if (!mask) {
            return { valid: false, error: 'invalidRule', context: { rule: `${key}-${locale}` } };
        }

        const testStr = toString(value);

        // If the mask is a function marker like "function:validateTaxId"
        if (typeof mask === 'string' && mask.startsWith('function:')) {
            const fnName = mask.slice('function:'.length);

            // Prefer importing a locale-specific implementation inside the validator folder
            // (e.g. validators/validateTaxId/i18n/pt-BR.js). This avoids importing the
            // router module itself (which may cause a recursive import for some cases).
            const localeKey = normalizeLocale(locale);
            let mod = null;

            // Try locale-specific validator module first
            try {
                mod = await import(`../../validators/${fnName}/i18n/${localeKey}.js`);
            } catch {
                // ignore and try fallback
            }

            // Fallback to validator module index (validators/<fnName>/index.js)
            if (!mod) {
                try {
                    mod = await import(`../../validators/${fnName}/index.js`);
                } catch (e) {
                    if (e && e.code === 'ERR_MODULE_NOT_FOUND') {
                        return {
                            valid: false,
                            error: 'invalidRule',
                            context: { rule: `${key}-${locale}` },
                        };
                    }
                    return { valid: false, error: 'genericError', context: { details: e.message } };
                }
            }

            // Prefer named export, then default export
            const validator = mod[fnName] || mod.default || mod.validateTaxId || mod.validate;
            if (typeof validator !== 'function') {
                return {
                    valid: false,
                    error: 'invalidRule',
                    context: { rule: `${key}-${locale}` },
                };
            }

            try {
                const res = await validator(testStr, options);
                if (typeof res === 'boolean') return { valid: res };
                if (res && typeof res === 'object' && 'valid' in res) return res;
                return { valid: false, error: 'genericError' };
            } catch (e) {
                return { valid: false, error: 'genericError', context: { details: e.message } };
            }
        }

        // Otherwise treat as a regex-based validation using existing helper
        const regex = getValidationRegex(locale, key, options);
        if (!regex) {
            return { valid: false, error: 'invalidRule', context: { rule: `${key}-${locale}` } };
        }

        try {
            // Allow callers to override case-sensitivity via options.caseSensitive.
            // If provided, rebuild the RegExp with the desired flags.
            let flags = regex.flags || '';
            if (typeof options.caseSensitive === 'boolean') {
                flags = options.caseSensitive ? '' : 'i';
            } else if (typeof options.flags === 'string') {
                flags = options.flags;
            }

            const compiled = new RegExp(regex.source, flags);
            return { valid: compiled.test(testStr) };
        } catch (e) {
            return {
                valid: false,
                error: 'validateMatchesInvalid',
                context: { details: e.message },
            };
        }
    } catch (e) {
        return { valid: false, error: 'genericError', context: { details: e.message } };
    }
}
