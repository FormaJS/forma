import { isString, toString, getValidationRegex } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

// RegEx to sanitize (remove spaces and hyphens)
const sanitizeRegex = /[\s-]/g;

/**
 * Validates the checksum of an ISSN.
 * @param {string} digits - String of 8 digits (sanitized, e.g., "1234567X").
 * @returns {boolean}
 */
function _checkISSNChecksum(digits) {
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    const digit = digits[i].toUpperCase() === 'X' ? 10 : parseInt(digits[i], 10);
    sum += digit * (8 - i);
  }
  return sum % 11 === 0;
}

/**
 * Validates if the string is a valid ISSN (International Standard Serial Number).
 * @param {string} str - String to be validated
 * @returns {ValidationResult} Validation result object
 */
export function validateISSN(str) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const testStr = toString(str).replace(sanitizeRegex, '').toUpperCase();

  const lang = '';

  try {
    const regex = getValidationRegex(lang, 'isISSN');
    if (!regex) {
      return { valid: false, error: 'invalidRule', context: { rule: 'isISSN' } };
    }

    if (!regex.test(testStr)) {
      return { valid: false, error: 'validateISSNFormat' };
    }

    if (!_checkISSNChecksum(testStr)) {
      return { valid: false, error: 'validateISSNChecksum' };
    }

    return { valid: true };
  } catch (e) {
    return { valid: false, error: 'genericError', context: { details: e.message } };
  }
}
