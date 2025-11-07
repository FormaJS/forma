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
 * Validates the checksum of an ISBN-10.
 * @param {string} digits - String of 10 digits (sanitized).
 * @returns {boolean}
 */
function _checkISBN10Checksum(digits) {
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += (i + 1) * parseInt(digits[i], 10);
  }

  const lastChar = digits[9].toUpperCase();
  const lastDigit = lastChar === 'X' ? 10 : parseInt(lastChar, 10);

  sum += 10 * lastDigit;

  return sum % 11 === 0;
}

/**
 * Validates the checksum of an ISBN-13.
 * @param {string} digits - String of 13 digits (sanitized).
 * @returns {boolean}
 */
function _checkISBN13Checksum(digits) {
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(digits[i], 10);
    // Ponderação 1 e 3 alternadamente
    sum += i % 2 === 0 ? digit * 1 : digit * 3;
  }

  const lastDigit = parseInt(digits[12], 10);
  const checksum = (10 - (sum % 10)) % 10;

  return checksum === lastDigit;
}

/**
 * Validates if the string is a valid ISBN (ISBN-10 or ISBN-13).
 * @param {string} str - String to be validated
 * @param {object} [options={}] - Options
 * @param {string|number} [options.version] - Forces validation ('10' or '13').
 * @returns {ValidationResult} Validation result object
 */
export function validateISBN(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const testStr = toString(str).replace(sanitizeRegex, '').toUpperCase();

  const lang = options.locale;
  if (!lang) {
    return { valid: false, error: 'localeRequired' };
  }

  const isbn10Regex = getValidationRegex(lang, 'isISBN10', options);
  const isbn13Regex = getValidationRegex(lang, 'isISBN13', options);

  if (!isbn10Regex || !isbn13Regex) {
    return { valid: false, error: 'invalidRule', context: { rule: 'isISBN' } };
  }

  const version = toString(options.version);

  if (version === '10') {
    if (!isbn10Regex.test(testStr)) {
      return { valid: false, error: 'validateISBNFormat' };
    }
    if (!_checkISBN10Checksum(testStr)) {
      return { valid: false, error: 'validateISBN10Checksum' };
    }
    return { valid: true };
  }

  if (version === '13') {
    if (!isbn13Regex.test(testStr)) {
      return { valid: false, error: 'validateISBNFormat' };
    }
    if (!_checkISBN13Checksum(testStr)) {
      return { valid: false, error: 'validateISBN13Checksum' };
    }
    return { valid: true };
  }

  if (isbn13Regex.test(testStr)) {
    return _checkISBN13Checksum(testStr)
      ? { valid: true }
      : { valid: false, error: 'validateISBN13Checksum' };
  }

  if (isbn10Regex.test(testStr)) {
    return _checkISBN10Checksum(testStr)
      ? { valid: true }
      : { valid: false, error: 'validateISBN10Checksum' };
  }

  return { valid: false, error: 'validateISBNFormat' };
}
