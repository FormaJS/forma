import { isString, toString } from '../../utils/index.js';
import { jwtRegex } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string has the format of a JSON Web Token (JWT)
 * (Header.Payload.Signature).
 * (Does not validate the cryptographic signature).
 * @param {string} str - String to validate
 * @returns {ValidationResult} Validation result object
 */
export function validateJWT(str) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }
  const testStr = toString(str).trim();

  if (jwtRegex.test(testStr)) {
    return { valid: true };
  } else {
    return { valid: false, error: 'validateJWT' };
  }
}
