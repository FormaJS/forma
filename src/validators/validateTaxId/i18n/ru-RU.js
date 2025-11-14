import { toString } from '../../../utils/index.js';

/**
 * Validates Russian Tax IDs (INN and OGRN/OGRNIP) with checksum validation.
 * INN: 10 digits (legal entities) or 12 digits (individuals)
 * OGRN: 13 digits (legal entities) or 15 digits (individual entrepreneurs - OGRNIP)
 */

/**
 * Validates 10-digit INN (legal entity).
 * @param {string} inn - 10 digit string
 * @returns {boolean}
 */
function _validateINN10(inn) {
  const weights = [2, 4, 10, 3, 5, 9, 4, 6, 8];
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(inn[i], 10) * weights[i];
  }
  const checkDigit = (sum % 11) % 10;
  return checkDigit === parseInt(inn[9], 10);
}

/**
 * Validates 12-digit INN (individual).
 * @param {string} inn - 12 digit string
 * @returns {boolean}
 */
function _validateINN12(inn) {
  const weights1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
  const weights2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];

  let sum1 = 0;
  for (let i = 0; i < 10; i++) {
    sum1 += parseInt(inn[i], 10) * weights1[i];
  }
  const checkDigit1 = (sum1 % 11) % 10;

  let sum2 = 0;
  for (let i = 0; i < 11; i++) {
    sum2 += parseInt(inn[i], 10) * weights2[i];
  }
  const checkDigit2 = (sum2 % 11) % 10;

  return checkDigit1 === parseInt(inn[10], 10) && checkDigit2 === parseInt(inn[11], 10);
}

/**
 * Validates 13-digit OGRN (legal entity).
 * @param {string} ogrn - 13 digit string
 * @returns {boolean}
 */
function _validateOGRN13(ogrn) {
  const base = ogrn.slice(0, 12);
  const checkDigit = parseInt(ogrn[12], 10);
  const remainder = parseInt(base, 10) % 11;
  const expected = remainder === 10 ? 0 : remainder;
  return checkDigit === expected;
}

/**
 * Validates 15-digit OGRNIP (individual entrepreneur).
 * @param {string} ogrnip - 15 digit string
 * @returns {boolean}
 */
function _validateOGRNIP15(ogrnip) {
  const base = ogrnip.slice(0, 14);
  const checkDigit = parseInt(ogrnip[14], 10);
  const remainder = parseInt(base, 10) % 13;
  const expected = remainder === 10 ? 0 : remainder % 10;
  return checkDigit === expected;
}

/**
 * Main validator for Russian Tax IDs.
 * @param {string} taxId - The tax ID to validate
 * @returns {object} Validation result { valid, error?, context? }
 */
export function validateTaxId(taxId) {
  if (typeof taxId !== 'string') {
    return {
      valid: false,
      error: 'validateTaxIdFormat',
      context: { received: typeof taxId },
    };
  }

  const digits = toString(taxId).replace(/\D/g, '');

  // Check for valid lengths: 10, 12, 13, or 15
  if (![10, 12, 13, 15].includes(digits.length)) {
    return {
      valid: false,
      error: 'validateTaxIdLength',
      context: { length: digits.length },
    };
  }

  // Reject all-zero sequences
  if (/^0+$/.test(digits)) {
    return {
      valid: false,
      error: 'validateTaxIdFormat',
      context: { reason: 'all-zero' },
    };
  }

  let isValid = false;

  if (digits.length === 10) {
    isValid = _validateINN10(digits);
  } else if (digits.length === 12) {
    isValid = _validateINN12(digits);
  } else if (digits.length === 13) {
    isValid = _validateOGRN13(digits);
  } else if (digits.length === 15) {
    isValid = _validateOGRNIP15(digits);
  }

  if (!isValid) {
    return {
      valid: false,
      error: 'validateTaxIdChecksum',
      context: { length: digits.length },
    };
  }

  return { valid: true };
}
