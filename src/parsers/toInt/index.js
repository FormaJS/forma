import { isString, getNormalizedNumberString } from '../../utils/index.js';

/**
 * Converts a string (locale-aware) to an integer number.
 * @param {string} str - The string to convert (e.g. "1.234,56").
 * @param {object} [options={}] - Options (should include 'locale').
 * @returns {number | null} Returns the integer number, or null if the
 * conversion fails (e.g. "abc") or the input is not a string.
 */
export function toInt(str, options = {}) {
  if (!isString(str)) {
    return null;
  }

  const normalizedStr = getNormalizedNumberString(str, options.locale || 'en-US');

  const num = parseInt(normalizedStr, 10);

  return isNaN(num) ? null : num;
}
