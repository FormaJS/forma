import { typeOf } from '../typeOf';

/**
 * Checks if the provided value is a primitive string.
 * @param {*} val - Value to check.
 * @returns {boolean} Returns true if it is a string, otherwise false.
 */
export function isString(val) {
  return typeOf(val) === 'string';
}
