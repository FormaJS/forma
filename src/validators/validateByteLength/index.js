import { isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates the byte length (assuming UTF-8) of a string.
 * @param {string} str - The string to validate.
 * @param {object} [options={}] - Options (e.g., { min: 10, max: 100 })
 * @returns {ValidationResult} Validation result object
 */
export function validateByteLength(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const { min = 0, max } = options;

  const testStr = toString(str);

  const byteLength = new TextEncoder().encode(testStr).length;

  if (byteLength < min) {
    return { valid: false, error: 'validateByteLengthMin', context: { min } };
  }

  if (typeof max !== 'undefined' && byteLength > max) {
    return { valid: false, error: 'validateByteLengthMax', context: { max } };
  }

  return { valid: true };
}
