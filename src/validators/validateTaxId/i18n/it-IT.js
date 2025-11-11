import { isString, toString } from '../../../utils/index.js';

/**
 * Validates an Italian Codice Fiscale (tax identification code).
 *
 * Codice Fiscale is the tax code used in Italy for individuals.
 *
 * Format: 16 alphanumeric characters (AAAAAAA##A##A###A)
 * - 6 letters: surname (3) + first name (3)
 * - 2 digits: year of birth
 * - 1 letter: month of birth (A-L, M, P, R, S, T, no I, O, U)
 * - 2 digits: day of birth (+ 40 for females)
 * - 4 alphanumeric: municipality code (1 letter + 3 digits)
 * - 1 letter: check character
 *
 * @param {string} cf - The Codice Fiscale to validate.
 * @returns {boolean} True if the Codice Fiscale is valid.
 *
 * @example
 * validateTaxId('RSSMRA85T10A562S')  // true (if valid)
 * validateTaxId('rssmra85t10a562s')  // true (case insensitive)
 * validateTaxId('INVALID123456789')  // false
 */
function validateTaxId(cf) {
  if (!isString(cf)) {
    return false;
  }

  const cleanStr = toString(cf).trim().toUpperCase().replace(/\s/g, '');

  if (cleanStr.length !== 16) {
    return false;
  }

  if (!/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/.test(cleanStr)) {
    return false;
  }

  const monthChar = cleanStr[8];
  const validMonths = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
  if (!validMonths.includes(monthChar)) {
    return false;
  }

  const day = parseInt(cleanStr.substring(9, 11), 10);
  if ((day < 1 || day > 31) && (day < 41 || day > 71)) {
    return false;
  }

  const oddMap = {
    0: 1,
    1: 0,
    2: 5,
    3: 7,
    4: 9,
    5: 13,
    6: 15,
    7: 17,
    8: 19,
    9: 21,
    A: 1,
    B: 0,
    C: 5,
    D: 7,
    E: 9,
    F: 13,
    G: 15,
    H: 17,
    I: 19,
    J: 21,
    K: 2,
    L: 4,
    M: 18,
    N: 20,
    O: 11,
    P: 3,
    Q: 6,
    R: 8,
    S: 12,
    T: 14,
    U: 16,
    V: 10,
    W: 22,
    X: 25,
    Y: 24,
    Z: 23,
  };

  const evenMap = {
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
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25,
  };

  let sum = 0;
  for (let i = 0; i < 15; i++) {
    const char = cleanStr[i];
    if (i % 2 === 0) {
      sum += oddMap[char];
    } else {
      sum += evenMap[char];
    }
  }

  const checkCharIndex = sum % 26;
  const checkChar = String.fromCharCode(65 + checkCharIndex);

  return cleanStr[15] === checkChar;
}

export { validateTaxId };
