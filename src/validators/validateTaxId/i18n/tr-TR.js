import { isString, toString } from '../../../utils/index.js';

/**
 * Validates a Turkish Tax Identification Number (Vergi Kimlik Numarası - VKN).
 * VKN is a 10-digit number used for tax purposes in Turkey.
 * The last digit is a check digit calculated using a specific modulo 10 algorithm.
 *
 * Algorithm details:
 * - For each of the first 9 digits: v = (digit + (9 - position)) mod 10
 * - Calculate: t = (v * 2^(9-position)) mod 9
 * - If v ≠ 0 and t = 0, add 9 to sum, otherwise add t
 * - Check digit = (10 - (sum mod 10)) mod 10
 *
 * @param {string} vkn - The VKN to validate.
 * @returns {boolean} True if the VKN is valid.
 */
function _validateVKN(vkn) {
  if (!vkn || vkn.length !== 10) {
    return false;
  }

  // All digits must be numeric
  if (!/^\d{10}$/.test(vkn)) {
    return false;
  }

  // First digit cannot be 0
  if (vkn.charAt(0) === '0') {
    return false;
  }

  // Calculate check digit using the VKN algorithm
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    const digit = parseInt(vkn.charAt(i), 10);
    const v = (digit + (9 - i)) % 10;
    const t = (v * Math.pow(2, 9 - i)) % 9;

    if (v !== 0 && t === 0) {
      sum += 9;
    } else {
      sum += t;
    }
  }

  const calculatedCheckDigit = (10 - (sum % 10)) % 10;
  const expectedCheckDigit = parseInt(vkn.charAt(9), 10);

  return calculatedCheckDigit === expectedCheckDigit;
}

/**
 * Validates a Turkish Citizenship Number (T.C. Kimlik Numarası - TCKN).
 * TCKN is an 11-digit number assigned to Turkish citizens.
 * Contains two check digits (10th and 11th positions).
 *
 * Algorithm:
 * - 10th digit = ((sum of odd-positioned digits × 7) - sum of even-positioned digits) mod 10
 * - 11th digit = (sum of first 10 digits) mod 10
 *
 * @param {string} tckn - The TCKN to validate.
 * @returns {boolean} True if the TCKN is valid.
 */
function _validateTCKN(tckn) {
  if (!tckn || tckn.length !== 11) {
    return false;
  }

  // All digits must be numeric
  if (!/^\d{11}$/.test(tckn)) {
    return false;
  }

  // First digit cannot be 0
  if (tckn.charAt(0) === '0') {
    return false;
  }

  // Calculate 10th digit (first check digit)
  let oddSum = 0;
  let evenSum = 0;

  for (let i = 0; i < 9; i++) {
    const digit = parseInt(tckn.charAt(i), 10);
    if (i % 2 === 0) {
      oddSum += digit; // positions 1, 3, 5, 7, 9
    } else {
      evenSum += digit; // positions 2, 4, 6, 8
    }
  }

  const calculatedDigit10 = (oddSum * 7 - evenSum) % 10;
  const expectedDigit10 = parseInt(tckn.charAt(9), 10);

  if (calculatedDigit10 !== expectedDigit10) {
    return false;
  }

  // Calculate 11th digit (second check digit)
  let totalSum = oddSum + evenSum + expectedDigit10;
  const calculatedDigit11 = totalSum % 10;
  const expectedDigit11 = parseInt(tckn.charAt(10), 10);

  return calculatedDigit11 === expectedDigit11;
}

/**
 * Validates a Turkish tax identification number.
 * Accepts VKN (10 digits for companies) or TCKN (11 digits for individuals).
 * Removes spaces and hyphens before validation.
 * @param {string} taxId - The tax ID to validate.
 * @returns {boolean} True if it is a valid VKN or TCKN.
 * @example
 * validateTaxId('1234567890')      // true (VKN, 10 digits)
 * validateTaxId('12345678901')     // true (TCKN, 11 digits)
 * validateTaxId('123 456 7890')    // true (VKN with spaces)
 * validateTaxId('123-456-78-90')   // true (VKN with hyphens)
 */
function validateTaxId(taxId) {
  if (!isString(taxId)) {
    return { valid: false, error: 'invalidType' };
  }

  // Remove spaces and hyphens
  const normalized = toString(taxId).replace(/[\s-]/g, '');

  // Try to validate as VKN (10 digits - companies)
  if (normalized.length === 10) {
    return _validateVKN(normalized) ? { valid: true } : { valid: false, error: 'validateTaxId' };
  }

  // Try to validate as TCKN (11 digits - individuals)
  if (normalized.length === 11) {
    return _validateTCKN(normalized) ? { valid: true } : { valid: false, error: 'validateTaxId' };
  }

  // Invalid length
  return { valid: false, error: 'validateTaxId' };
}

export { validateTaxId };
