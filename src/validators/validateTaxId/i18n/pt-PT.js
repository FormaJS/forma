import { isString, toString } from '../../../utils/index.js';

/**
 * Validates a Portuguese NIF (Número de Identificação Fiscal).
 *
 * NIF is the tax identification number used in Portugal.
 *
 * Format: 9 digits (can be formatted with spaces: # #### ####)
 *
 * Valid first digits (type indicators):
 * - 1, 2, 3: Individual persons
 * - 5: Legal entities (companies)
 * - 6: Public administration
 * - 8: Individual entrepreneurs, sole proprietorships
 * - 9: Civil irregular organizations, condominiums, non-resident entities
 *
 * The last digit is a check digit calculated using modulo 11 algorithm.
 *
 * @param {string} nif - The NIF to validate.
 * @returns {boolean} True if the NIF is valid.
 *
 * @example
 * validateTaxId('123456789')      // true (if check digit is valid)
 * validateTaxId('1 2345 6789')    // true (formatted, if valid)
 * validateTaxId('987654321')      // false (invalid check digit)
 */
function validateTaxId(nif) {
  if (!isString(nif)) {
    return false;
  }

  const cleanStr = toString(nif).trim().replace(/\s/g, '');

  if (!/^\d{9}$/.test(cleanStr)) {
    return false;
  }

  const firstDigit = parseInt(cleanStr[0], 10);

  const validFirstDigits = [1, 2, 3, 5, 6, 8, 9];
  if (!validFirstDigits.includes(firstDigit)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(cleanStr[i], 10) * (9 - i);
  }

  const remainder = sum % 11;
  let checkDigit;

  if (remainder === 0 || remainder === 1) {
    checkDigit = 0;
  } else {
    checkDigit = 11 - remainder;
  }

  const providedCheckDigit = parseInt(cleanStr[8], 10);

  return checkDigit === providedCheckDigit;
}

export { validateTaxId };
