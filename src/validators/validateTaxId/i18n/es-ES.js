import { isString, toString } from '../../../utils/index.js';

const dniLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';

const cifFirstLetters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'J',
  'N',
  'P',
  'Q',
  'R',
  'S',
  'U',
  'V',
  'W',
];

const cifLastLetterOrganizations = ['A', 'B', 'E', 'H'];
const cifLastDigitOrganizations = ['N', 'P', 'Q', 'S', 'W'];

/**
 * Validates a Spanish DNI (Documento Nacional de Identidad).
 * Format: 8 digits + 1 control letter
 * @param {string} dni - The DNI to validate (format: ########A).
 * @returns {boolean} True if the DNI is valid.
 */
function _validateDNI(dni) {
  if (!/^\d{8}[A-Z]$/.test(dni)) {
    return false;
  }

  const digits = dni.slice(0, 8);
  const letter = dni.slice(8);

  const expectedLetter = dniLetters[parseInt(digits, 10) % 23];

  return letter === expectedLetter;
}

/**
 * Validates a Spanish NIE (Número de Identidad de Extranjero).
 * Format: 1 letter (X, Y, Z) + 7 digits + 1 control letter
 * @param {string} nie - The NIE to validate (format: A#######A).
 * @returns {boolean} True if the NIE is valid.
 */
function _validateNIE(nie) {
  if (!/^[XYZ]\d{7}[A-Z]$/.test(nie)) {
    return false;
  }

  const firstLetter = nie[0];
  const digits = nie.slice(1, 8);
  const controlLetter = nie.slice(8);

  let numericValue;
  if (firstLetter === 'X') numericValue = '0';
  else if (firstLetter === 'Y') numericValue = '1';
  else if (firstLetter === 'Z') numericValue = '2';
  else return false;

  const fullNumber = numericValue + digits;

  const expectedLetter = dniLetters[parseInt(fullNumber, 10) % 23];

  return controlLetter === expectedLetter;
}

/**
 * Validates a Spanish CIF (Código de Identificación Fiscal).
 * Format: 1 letter + 7 digits + 1 control digit/letter
 * @param {string} cif - The CIF to validate (format: A########).
 * @returns {boolean} True if the CIF is valid.
 */
function _validateCIF(cif) {
  if (!/^[A-Z]\d{7}[A-Z0-9]$/.test(cif)) {
    return false;
  }

  const firstLetter = cif[0];
  const digits = cif.slice(1, 8);
  const controlChar = cif.slice(8);

  if (!cifFirstLetters.includes(firstLetter)) {
    return false;
  }

  let sumA = 0;
  let sumB = 0;

  for (let i = 0; i < 7; i++) {
    const digit = parseInt(digits[i], 10);
    if (i % 2 === 0) {
      const doubled = digit * 2;
      sumB += Math.floor(doubled / 10) + (doubled % 10);
    } else {
      sumA += digit;
    }
  }

  const totalSum = sumA + sumB;
  const unitDigit = totalSum % 10;
  const controlDigit = unitDigit === 0 ? 0 : 10 - unitDigit;

  const controlLetters = 'JABCDEFGHI';
  const controlLetter = controlLetters[controlDigit];

  if (cifLastLetterOrganizations.includes(firstLetter)) {
    return controlChar === controlLetter;
  } else if (cifLastDigitOrganizations.includes(firstLetter)) {
    return controlChar === String(controlDigit);
  } else {
    return controlChar === controlLetter || controlChar === String(controlDigit);
  }
}

/**
 * Validates Spanish tax identifiers (DNI, NIE, CIF).
 * Cleans the input string, checks the format and delegates to specific validators.
 * @param {string} tin - The Tax ID to validate (may include formatting characters).
 * @returns {boolean} True if it is a valid DNI, NIE or CIF.
 * @example
 * validateTaxId('12345678Z')   // true (DNI)
 * validateTaxId('X1234567T')   // true (NIE)
 * validateTaxId('A1234567B')   // true (CIF)
 */
function validateTaxId(tin) {
  if (!isString(tin)) {
    return false;
  }

  let testStr = toString(tin).trim().toUpperCase();
  const cleanStr = testStr.replace(/[\s-]/g, '');

  if (cleanStr.length !== 9) {
    return false;
  }

  if (/^\d{8}[A-Z]$/.test(cleanStr)) {
    return _validateDNI(cleanStr);
  }

  if (/^[XYZ]\d{7}[A-Z]$/.test(cleanStr)) {
    return _validateNIE(cleanStr);
  }

  if (/^[A-Z]\d{7}[A-Z0-9]$/.test(cleanStr)) {
    return _validateCIF(cleanStr);
  }

  return false;
}

export { validateTaxId };
