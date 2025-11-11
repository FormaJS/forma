import { isString, toString } from '../../../utils/index.js';

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/i;
const PAN_HOLDER_TYPES = new Set(['P', 'C', 'H', 'A', 'B', 'G', 'J', 'L', 'F', 'T']);

const GSTIN_REGEX = /^(\d{2})([A-Z]{5}\d{4}[A-Z])([1-9A-Z])Z([0-9A-Z])$/i;

/**
 * Validates Indian PAN (primary personal tax ID).
 * Notes:
 * - Case-insensitive letters allowed.
 * - We only check structural validity; additional letter-category rules are out-of-scope.
 */
function _validatePAN(pan) {
  if (!pan) return false;
  const s = pan.toUpperCase().replace(/[\s-]/g, '');
  if (!PAN_REGEX.test(s)) return false;
  const holderType = s[3];
  if (!PAN_HOLDER_TYPES.has(holderType)) return false;
  return true;
}

/**
 * Validates Indian GSTIN (Goods and Services Tax Identification Number).
 * Format: 15 characters: 2-digit state code + PAN-like block + entity code + 'Z' + checksum
 * - State code must be between 01 and 37 or 97
 * - PAN-like block is validated by _validatePAN
 * - Checksum is calculated by _computeGstinCheckChar
 * @param {string} gstin - GSTIN to validate.
 * @returns {boolean} True if the GSTIN is valid.
 */
function _validateGSTIN(gstin) {
  if (!gstin) return false;
  const s = gstin.toUpperCase().replace(/[\s-]/g, '');
  const m = s.match(GSTIN_REGEX);
  if (!m) return false;

  const state = parseInt(m[1], 10);
  const validState = (state >= 1 && state <= 37) || state === 97;
  if (!validState) return false;

  const panPart = m[2];
  if (!_validatePAN(panPart)) return false;

  const expected = _computeGstinCheckChar(s.slice(0, 14));
  return s[14] === expected;
}

/**
 * Validates Indian tax identifier. Accepts either GSTIN (15 chars) or PAN (10 chars).
 * The input is trimmed and normalized (spaces and dashes removed) before validation.
 * @param {string} tin - Tax ID input (PAN or GSTIN).
 * @returns {boolean} True if the input is a valid PAN or GSTIN.
 * @example
 * validateTaxId('ABCDE1234F')     // true (PAN)
 * validateTaxId('27ABCDE1234F1Z5')// true (GSTIN)
 */
function validateTaxId(tin) {
  if (!isString(tin)) return false;
  const testStr = toString(tin).trim();
  if (testStr === '') return false;
  const raw = testStr.replace(/[\s-]/g, '');
  if (raw.length === 15) {
    if (_validateGSTIN(raw)) return true;
  }
  return _validatePAN(raw);
}

/**
 * Converts a base36 character to its numeric value (0-35).
 * Returns -1 for invalid characters.
 * @param {string} ch - Single base36 character.
 * @returns {number} Numeric value or -1 if invalid.
 */
function _charToCode36(ch) {
  const c = ch.toUpperCase();
  if (c >= '0' && c <= '9') return c.charCodeAt(0) - 48; // '0' => 0
  if (c >= 'A' && c <= 'Z') return c.charCodeAt(0) - 55; // 'A' => 10
  return -1;
}

/**
 * Converts a numeric value (0-35) to its base36 character representation.
 * @param {number} n - Numeric value between 0 and 35.
 * @returns {string} Single base36 character.
 */
function _codeToChar36(n) {
  if (n >= 0 && n <= 9) return String.fromCharCode(48 + n);
  if (n >= 10 && n <= 35) return String.fromCharCode(55 + n);
  return '0';
}

/**
 * Computes the GSTIN check character for the first 14 characters using a
 * weighted base36 algorithm. This matches the official GSTIN checksum
 * calculation used by Indian tax authorities.
 * @param {string} prefix14 - First 14 characters of the GSTIN.
 * @returns {string} Single check character.
 */
function _computeGstinCheckChar(prefix14) {
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    const code = _charToCode36(prefix14[i]);
    if (code < 0) return '0';
    const factor = i % 2 === 0 ? 1 : 2;
    const prod = code * factor;
    sum += Math.floor(prod / 36) + (prod % 36);
  }
  const check = (36 - (sum % 36)) % 36;
  return _codeToChar36(check);
}

export { validateTaxId };
