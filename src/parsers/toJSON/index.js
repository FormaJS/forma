import { isString, toString } from '../../utils/index.js';

/**
 * Converts a JSON string into a JavaScript object/value.
 * @param {string} str - The JSON string to convert.
 * @param {object} [options={}] - (Not used by this parser)
 * @returns {*} Returns the JavaScript object/value if parsing succeeds,
 * or null if the input is not a string or parsing fails.
 */
export function toJSON(str) {
  if (!isString(str)) {
    return null;
  }

  try {
    return JSON.parse(toString(str));
  } catch {
    return null;
  }
}
