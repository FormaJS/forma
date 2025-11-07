import { isString, toString, executeI18nValidationRule } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is a valid MongoId (24 hex characters).
 * @param {string} str - String to validate
 * @returns {ValidationResult} Validation result object
 */
export async function validateMongoId(str) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const testStr = toString(str);
  const lang = '';

  try {
    const res = await executeI18nValidationRule(lang, 'isMongoId', testStr);
    if (res && res.error === 'invalidRule') {
      return { valid: false, error: 'invalidRule', context: { rule: 'isMongoId' } };
    }

    const matched = (res && res.valid) || res === true;
    if (matched) return { valid: true };
    return { valid: false, error: 'validateMongoId' };
  } catch (e) {
    return { valid: false, error: 'genericError', context: { details: e && e.message } };
  }
}
