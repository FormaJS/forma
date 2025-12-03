import { isString, toString } from '../../utils/index.js';
import { executeI18nValidationRule } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates a tax payment identifier according to locale
 * @param {string} str - Document to validate
 * @param {object} [options={}] - Options (must contain 'locale')
 * @returns {Promise<ValidationResult>} Promise that resolves with the result object
 */
export async function validateTaxId(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const testStr = toString(str);
  if (testStr.trim() === '') {
    return { valid: false, error: 'isEmpty' };
  }

  const lang = options.locale;
  if (!lang) {
    return { valid: false, error: 'localeRequired' };
  }

  try {
    // Delegate to the i18n-aware executor. This will handle regex-based
    // validations and function:... markers (including locale-specific
    // validator implementations) transparently.
    const result = await executeI18nValidationRule(lang, 'taxid', testStr, options);

    // Normalize the result: the executor may return { valid: boolean }
    // or a richer object with `error`. For invalid boolean responses
    // we must return the expected error key used across tests.
    if (result && typeof result === 'object') {
      if (result.valid === true) return { valid: true };
      if (result.error) return result;
      // No explicit error provided by executor -> map to default
      return { valid: false, error: 'validateTaxId' };
    }

    // Fallback for boolean or unexpected shapes
    if (typeof result === 'boolean') {
      return result ? { valid: true } : { valid: false, error: 'validateTaxId' };
    }
    return { valid: false, error: 'genericError' };
  } catch (e) {
    if (e && e.code === 'ERR_MODULE_NOT_FOUND') {
      return { valid: false, error: 'invalidRule', context: { rule: `taxId-${lang}` } };
    }
    return { valid: false, error: 'genericError', context: { details: e.message } };
  }
}
