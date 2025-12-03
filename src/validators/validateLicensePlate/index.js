import { isString, toString, executeI18nValidationRule } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates a vehicle license plate according to locale and options (e.g., state)
 * @param {string} plate - Plate to validate
 * @param {object} [options={}] - Options (e.g., { locale: 'en-US', state: 'CA' })
 * @returns {ValidationResult} Validation result object
 */
export async function validateLicensePlate(plate, options = {}) {
  if (!isString(plate)) {
    return { valid: false, error: 'invalidType' };
  }

  const lang = options.locale;
  if (!lang) {
    return { valid: false, error: 'localeRequired' };
  }

  const testStr = toString(plate).trim();
  if (testStr === '') {
    return { valid: false, error: 'isEmpty' };
  }

  try {
    const res = await executeI18nValidationRule(lang, 'licenseplate', testStr, options);

    if (res && typeof res === 'object') {
      if (res.valid === true) return { valid: true };
      if (res.error) return res;
      return { valid: false, error: 'licensePlate' };
    }

    if (typeof res === 'boolean') {
      return res ? { valid: true } : { valid: false, error: 'licensePlate' };
    }

    return { valid: false, error: 'genericError' };
  } catch (e) {
    return { valid: false, error: 'genericError', context: { details: e && e.message } };
  }
}
