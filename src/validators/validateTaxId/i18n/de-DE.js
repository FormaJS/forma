import { isString, toString, iso7064Mod11_10CheckDigit } from '../../../utils/index.js';

/**
 * Validate German personal tax identification number (IdNr, 11 digits).
 * Rules:
 * - Must be 11 digits, cannot start with 0, cannot be a repeated single digit.
 * - Check digit calculated using ISO/IEC 7064 Mod 11,10 over the first 10 digits.
 * @param {string} num - Numeric string with 11 digits.
 * @returns {boolean} True if valid according to the official algorithm.
 */
function isValidDEIdNr(num) {
  if (!/^\d{11}$/.test(num)) return false;
  if (num[0] === '0') return false;
  if (/^(\d)\1{10}$/.test(num)) return false;
  const body = num.slice(0, 10);
  const check = Number(num[10]);
  const calc = iso7064Mod11_10CheckDigit(body);
  return check === calc;
}

/**
 * Validate German VAT number (USt-IdNr).
 * Format: "DE" + 9 digits. The last digit is ISO/IEC 7064 Mod 11,10 over the first 8 digits.
 * @param {string} s - String in the canonical format (e.g., "DE123456789").
 * @returns {boolean} True if valid.
 */
function isValidDEUStIdNr(s) {
  if (!/^DE\d{9}$/.test(s)) return false;
  const digits = s.slice(2);
  const body = digits.slice(0, 8);
  const check = Number(digits[8]);
  const calc = iso7064Mod11_10CheckDigit(body);
  return check === calc;
}

/**
 * Locale-aware German Tax ID validator.
 * Accepts input with spaces, dots, or hyphens and normalizes it.
 * Supported forms:
 * - Personal IdNr: 11 digits (ISO/IEC 7064 Mod 11,10)
 * - VAT USt-IdNr: "DE" + 9 digits (ISO/IEC 7064 Mod 11,10)
 * @param {unknown} input - Value to validate (stringable).
 * @returns {boolean} True if the input matches a supported, valid German tax identifier.
 * @example
 * validateTaxId('065 935 267 37') // true (IdNr)
 * validateTaxId('DE136695976')    // true (USt-IdNr)
 */
function validateTaxId(input) {
  if (!isString(input)) return false;
  const s = toString(input)
    .trim()
    .toUpperCase()
    .replace(/[\s.-]/g, '');

  if (s.startsWith('DE')) return isValidDEUStIdNr(s);
  if (/^\d{11}$/.test(s)) return isValidDEIdNr(s);
  return false;
}

export { validateTaxId };
