import { isString, getNormalizedNumberString } from '../../utils/index.js';

/**
 * Converts a string (locale-aware) to a floating point number.
 * @param {string} str - The string to convert (e.g. "1.234,56").
 * @param {object} [options={}] - Options (should include 'locale').
 * @returns {number | null} Returns the converted number, or null if
 * the conversion fails (e.g. "abc") or the input is not a string.
 */
export function toFloat(str, options = {}) {
  if (!isString(str)) {
    return null;
  }

  const normalizedStr = getNormalizedNumberString(str, options.locale);

  const num = parseFloat(normalizedStr);

  return isNaN(num) ? null : num;
}
