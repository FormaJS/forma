import { isString, toString, getValidationRegex, luhnCheck } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

const sanitizeRegex = /[\s-]/g;

/**
 * Validates if the string is a valid IMEI number (15 digits and Luhn checksum).
 * @param {string} str - String to be validated
 * @returns {ValidationResult} Validation result object
 */
export function validateIMEI(str) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const testStr = toString(str).replace(sanitizeRegex, '');

  const lang = '';

  try {
    const regex = getValidationRegex(lang, 'isIMEI');
    if (!regex) {
      return { valid: false, error: 'invalidRule', context: { rule: 'isIMEI' } };
    }

    if (!regex.test(testStr)) {
      return { valid: false, error: 'validateIMEIFormat' };
    }

    if (!luhnCheck(testStr)) {
      return { valid: false, error: 'validateIMEIChecksum' };
    }

    return { valid: true };
  } catch (e) {
    return { valid: false, error: 'genericError', context: { details: e.message } };
  }
}
