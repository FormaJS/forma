import { isString, toString } from '../../utils/index.js';
import { getLocaleData } from '../../i18n/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string represents a boolean value (locale-aware).
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options
 * @param {string} [options.locale] - Locale to fetch the rules.
 * @param {boolean} [options.strict=false] - If true, uses only the 'strict' lists.
 * @returns {ValidationResult} Validation result object
 */
export function validateBoolean(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const testStr = toString(str).trim().toLowerCase();

  const lang = options.locale;
  if (!lang) {
    return { valid: false, error: 'localeRequired' };
  }

  const localeData = getLocaleData(lang);
  const booleanRules = localeData?.validate?.boolean;

  if (!booleanRules) {
    return { valid: false, error: 'invalidRule', context: { rule: `boolean-${lang}` } };
  }

  const { strict = false } = options;

  let allowedValues = [...(booleanRules.strictTrue || []), ...(booleanRules.strictFalse || [])];

  if (strict === false) {
    allowedValues = allowedValues.concat([
      ...(booleanRules.looseTrue || []),
      ...(booleanRules.looseFalse || []),
    ]);
  }

  if (allowedValues.includes(testStr)) {
    return { valid: true };
  } else {
    return { valid: false, error: 'validateBoolean' };
  }
}
