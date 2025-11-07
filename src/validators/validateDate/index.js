import { isString, toString } from '../../utils/index.js';
import { toDate } from '../../parsers/toDate/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is a valid date (ISO or locale format) and
 * optionally within a range.
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options (must contain 'locale')
 * @param {string|Date} [options.minDate] - Minimum date (inclusive).
 * @param {string|Date} [options.maxDate] - Maximum date (inclusive).
 * @returns {ValidationResult} Validation result object
 */
export function validateDate(str, options = {}) {
  if (!isString(str) && typeof str !== 'number') {
    return { valid: false, error: 'invalidType' };
  }

  const dateObj = toDate(str, options);

  if (dateObj === null) {
    return { valid: false, error: 'validateDate' };
  }

  const { minDate, maxDate } = options;
  const timestamp = dateObj.getTime();

  if (minDate) {
    const minDateObj = minDate instanceof Date ? minDate : toDate(minDate, options);

    if (minDateObj) {
      if (timestamp < minDateObj.getTime()) {
        return {
          valid: false,
          error: 'validateDateMin',
          context: { minDate: toString(minDate) },
        };
      }
    }
  }

  if (maxDate) {
    const maxDateObj = maxDate instanceof Date ? maxDate : toDate(maxDate, options);

    if (maxDateObj) {
      if (timestamp > maxDateObj.getTime()) {
        return {
          valid: false,
          error: 'validateDateMax',
          context: { maxDate: toString(maxDate) },
        };
      }
    }
  }

  return { valid: true };
}
