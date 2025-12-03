import { isString, toString } from '../../../utils/index.js';

/**
 * Validates a Chinese Unified Social Credit Code (USCC / 统一社会信用代码).
 * Format: 18 characters (digits and uppercase letters, excluding I, O, Z, S, V)
 * The USCC is used to identify organizations in China.
 *
 * Structure:
 * - Position 1: Registration management code (1 digit)
 * - Position 2: Organization category code (1 digit)
 * - Position 3-8: Administrative division code (6 digits)
 * - Position 9-17: Organization code (9 characters)
 * - Position 18: Check code (1 character)
 *
 * @param {string} uscc - The USCC to validate.
 * @returns {boolean} True if the USCC is valid.
 */
function _validateUSCC(uscc) {
  // Must be exactly 18 characters
  if (uscc.length !== 18) {
    return false;
  }

  // Valid characters (excluding I, O, Z, S, V)
  const validChars = '0123456789ABCDEFGHJKLMNPQRTUWXY';

  // Check all characters are valid
  for (let i = 0; i < 18; i++) {
    const ch = uscc[i];
    if (!validChars.includes(ch)) {
      return false;
    }
    // Prevent forbidden characters I, O, Z, S, V explicitly if pattern changes in future
    if (/[IOZSV]/.test(ch)) {
      return false;
    }
  }

  // Calculate check code using weighted sum
  const weights = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];
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
    J: 18,
    K: 19,
    L: 20,
    M: 21,
    N: 22,
    P: 23,
    Q: 24,
    R: 25,
    T: 26,
    U: 27,
    W: 28,
    X: 29,
    Y: 30,
  };

  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += charValues[uscc[i]] * weights[i];
  }

  const checkValue = 31 - (sum % 31);
  const checkCode = checkValue === 31 ? '0' : validChars[checkValue];

  return uscc[17] === checkCode;
}

/**
 * Validates a Chinese tax identification number.
 * Currently supports:
 * - USCC (Unified Social Credit Code) - 18 characters
 *
 * @param {string} tid - Tax identification number to validate.
 * @returns {boolean} True if valid.
 */
function validateTaxId(tid) {
  if (!isString(tid)) {
    return false;
  }

  // Remove spaces and convert to uppercase
  const cleanTid = toString(tid).replace(/\s/g, '').toUpperCase();

  // Try to validate as USCC
  if (cleanTid.length === 18) {
    return _validateUSCC(cleanTid);
  }

  return false;
}

export { validateTaxId };
