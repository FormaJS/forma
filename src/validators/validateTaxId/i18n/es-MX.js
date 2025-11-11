import { isString, toString } from '../../../utils/index.js';

/**
 * Calculates the check digit for an RFC.
 * Uses the official algorithm with the verification digit table.
 *
 * @private
 * @param {string} rfcWithoutCheckDigit - RFC without the last check digit.
 * @returns {string} The calculated check digit.
 */
function _calculateRFCCheckDigit(rfcWithoutCheckDigit) {
  const charValues = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    G: 16,
    H: 17,
    I: 18,
    J: 19,
    K: 20,
    L: 21,
    M: 22,
    N: 23,
    '&': 24,
    O: 25,
    P: 26,
    Q: 27,
    R: 28,
    S: 29,
    T: 30,
    U: 31,
    V: 32,
    W: 33,
    X: 34,
    Y: 35,
    Z: 36,
    ' ': 37,
    Ñ: 38,
  };

  let sum = 0;
  const length = rfcWithoutCheckDigit.length;

  for (let i = 0; i < length; i++) {
    const char = rfcWithoutCheckDigit[i];
    const value = charValues[char] || 0;
    const weight = length - i + 1;
    sum += value * weight;
  }

  const remainder = sum % 11;

  if (remainder === 0) {
    return '0';
  } else if (remainder === 10) {
    return 'A';
  } else {
    return String(11 - remainder);
  }
}

/**
 * Validates a Mexican RFC (Registro Federal de Contribuyentes).
 *
 * RFC is the tax identification number used in Mexico.
 *
 * Format for individuals (persona física): AAAA######AAA (13 characters)
 * - 4 letters: surname initial + first internal vowel + name initial + first internal vowel
 * - 6 digits: date of birth (YYMMDD)
 * - 3 alphanumeric: homoclave (2 chars) + check digit (1 char)
 *
 * Format for legal entities (persona moral): AAA######AAA (12 characters)
 * - 3 letters: company name initials
 * - 6 digits: registration date (YYMMDD)
 * - 3 alphanumeric: homoclave (2 chars) + check digit (1 char)
 *
 * @param {string} rfc - The RFC to validate.
 * @returns {boolean} True if the RFC is valid.
 *
 * @example
 * validateTaxId('VECJ880326XXX')  // true (individual, 13 chars)
 * validateTaxId('GOM980527XXX')   // true (legal entity, 12 chars)
 * validateTaxId('HEGG560427XXX')  // true
 */
function validateTaxId(rfc) {
  if (!isString(rfc)) {
    return false;
  }

  const cleanStr = toString(rfc).trim().toUpperCase().replace(/\s/g, '');

  if (cleanStr.length !== 12 && cleanStr.length !== 13) {
    return false;
  }

  const is12Chars = cleanStr.length === 12;
  const is13Chars = cleanStr.length === 13;

  if (is12Chars) {
    if (!/^[A-Z&Ñ]{3}\d{6}[A-Z0-9]{3}$/.test(cleanStr)) {
      return false;
    }
  } else if (is13Chars) {
    if (!/^[A-Z&Ñ]{4}\d{6}[A-Z0-9]{3}$/.test(cleanStr)) {
      return false;
    }
  }

  const dateStart = is13Chars ? 4 : 3;
  const dateStr = cleanStr.substring(dateStart, dateStart + 6);

  const month = parseInt(dateStr.substring(2, 4), 10);
  const day = parseInt(dateStr.substring(4, 6), 10);

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }

  const checkDigit = cleanStr[cleanStr.length - 1];
  const calculatedCheckDigit = _calculateRFCCheckDigit(cleanStr.substring(0, cleanStr.length - 1));

  return checkDigit === calculatedCheckDigit;
}

export { validateTaxId };
