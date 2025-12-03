import { isString, toString } from '../../../utils/index.js';

/**
 * Validates a Japanese My Number (マイナンバー).
 * My Number is a 12-digit number used for social security and tax purposes.
 * The last digit is a check digit calculated using a specific algorithm.
 *
 * Algorithm: P_n = Q_n mod 11
 * where Q_n = (1×a_1 + 2×a_2 + 3×a_3 + ... + 11×a_11)
 *
 * @param {string} myNumber - The My Number to validate.
 * @returns {boolean} True if the My Number is valid.
 */
function _validateMyNumber(myNumber) {
  if (!myNumber || myNumber.length !== 12) {
    return false;
  }

  // All digits must be numeric
  if (!/^\d{12}$/.test(myNumber)) {
    return false;
  }

  // Calculate check digit using weighted sum (weights: 1, 2, 3, ..., 11)
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    const digit = parseInt(myNumber.charAt(i), 10);
    sum += (i + 1) * digit;
  }

  const calculatedCheckDigit = sum % 11;
  const expectedCheckDigit = parseInt(myNumber.charAt(11), 10);

  return calculatedCheckDigit === expectedCheckDigit;
}

/**
 * Validates a Japanese Corporate Number (法人番号).
 * Corporate Number is a 13-digit number assigned to corporations.
 * The first digit is a check digit calculated using modulo 9.
 *
 * Algorithm: Check digit = 9 - (weighted sum mod 9)
 * Weights alternate between 1 and 2 for digits 2-13.
 *
 * @param {string} corpNumber - The Corporate Number to validate.
 * @returns {boolean} True if the Corporate Number is valid.
 */
function _validateCorporateNumber(corpNumber) {
  if (!corpNumber || corpNumber.length !== 13) {
    return false;
  }

  // All digits must be numeric
  if (!/^\d{13}$/.test(corpNumber)) {
    return false;
  }

  // Calculate check digit from digits 2-13 (index 1-12)
  const checkDigit = parseInt(corpNumber.charAt(0), 10);
  let sum = 0;

  // Weight pattern alternates: 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2
  for (let i = 1; i < 13; i++) {
    const digit = parseInt(corpNumber.charAt(i), 10);
    const weight = i % 2 === 1 ? 1 : 2;
    sum += digit * weight;
  }

  const calculatedCheckDigit = 9 - (sum % 9);

  return checkDigit === calculatedCheckDigit;
}

/**
 * Validates a Japanese tax identification number.
 * Accepts My Number (12 digits) or Corporate Number (13 digits).
 * Removes spaces and hyphens before validation.
 * @param {string} taxId - The tax ID to validate.
 * @returns {boolean} True if it is a valid My Number or Corporate Number.
 * @example
 * validateTaxId('123456789012')      // true (My Number, 12 digits)
 * validateTaxId('1234567890123')     // true (Corporate Number, 13 digits)
 * validateTaxId('1234 5678 9012')    // true (My Number with spaces)
 * validateTaxId('1234-5678-9012')    // true (My Number with hyphens)
 */
function validateTaxId(taxId) {
  if (!isString(taxId)) {
    return { valid: false, error: 'invalidType' };
  }

  // Remove spaces and hyphens
  const normalized = toString(taxId).replace(/[\s-]/g, '');

  // Try to validate as My Number (12 digits)
  if (normalized.length === 12) {
    if (!/^\d{12}$/.test(normalized)) {
      return { valid: false, error: 'validateTaxId' };
    }
    // Explicitly reject all-zero value even if checksum matches
    if (/^0{12}$/.test(normalized)) {
      return { valid: false, error: 'validateTaxId' };
    }
    // Strict checksum validation
    if (!_validateMyNumber(normalized)) {
      return { valid: false, error: 'validateTaxId' };
    }
    return { valid: true };
  }

  // Try to validate as Corporate Number (13 digits)
  if (normalized.length === 13) {
    if (!/^\d{13}$/.test(normalized)) {
      return { valid: false, error: 'validateTaxId' };
    }
    // Explicitly reject all-zero value even if checksum matches
    if (/^0{13}$/.test(normalized)) {
      return { valid: false, error: 'validateTaxId' };
    }
    // Strict checksum validation
    if (!_validateCorporateNumber(normalized)) {
      return { valid: false, error: 'validateTaxId' };
    }
    return { valid: true };
  }

  // Invalid length
  return { valid: false, error: 'validateTaxId' };
}

export { validateTaxId };
