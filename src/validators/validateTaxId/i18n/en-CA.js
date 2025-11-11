import { isString, toString, luhnCheck } from '../../../utils/index.js';

/**
 * Validates a Canadian SIN (Social Insurance Number).
 * Rules:
 * - Must be 9 digits
 * - Not all digits the same (reject repeated sequences like 111111111)
 * - Uses Luhn algorithm for checksum validation
 * @param {string} value - The SIN to validate (may include separators).
 * @returns {boolean} True if the SIN is valid.
 */
function _validateSIN(value) {
  if (!value) return false;
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 9) return false;
  if (/^(\d)\1{8}$/.test(digits)) return false;
  return luhnCheck(digits);
}

/**
 * Validates Canadian Tax ID (SIN).
 * Normalizes the input string and delegates to _validateSIN.
 * @param {string} str - Input tax id (SIN) to validate (may include separators).
 * @returns {boolean} True if valid SIN.
 * @example
 * validateTaxId('046-454-286') // true
 * validateTaxId('046454286')   // true
 */
function validateTaxId(str) {
  if (!isString(str)) return false;
  const s = toString(str).trim();
  if (s === '') return false;
  return _validateSIN(s);
}

export { validateTaxId };
