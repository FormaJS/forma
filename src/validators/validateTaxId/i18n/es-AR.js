import { isString, toString } from '../../../utils/index.js';

/**
 * Validates an Argentine CUIT/CUIL/CDI (tax identification number).
 *
 * CUIT (Código Único de Identificación Tributaria): 11 digits
 * CUIL (Código Único de Identificación Laboral): 11 digits
 * CDI (Clave de Identificación): 11 digits
 *
 * Format: XX-XXXXXXXX-X (type prefix - number - check digit)
 *
 * The check digit is calculated using modulo 11 algorithm.
 *
 * Valid prefixes:
 * - 20, 23, 24, 27: Individuals (CUIL/CUIT)
 * - 30, 33, 34: Legal entities (CUIT)
 * - 50, 51, 55: Foreign entities (CDI)
 *
 * @param {string} cuit - The CUIT/CUIL/CDI to validate.
 * @returns {boolean} True if the CUIT/CUIL/CDI is valid.
 *
 * @example
 * validateTaxId('20-12345678-9')  // true (formatted)
 * validateTaxId('20123456789')    // true (unformatted)
 * validateTaxId('30-71234567-8')  // true (legal entity)
 */
function validateTaxId(cuit) {
  if (!isString(cuit)) {
    return false;
  }

  const cleanStr = toString(cuit).trim().replace(/[\s-]/g, '');

  if (!/^\d{11}$/.test(cleanStr)) {
    return false;
  }

  const prefix = cleanStr.substring(0, 2);

  const validPrefixes = ['20', '23', '24', '27', '30', '33', '34', '50', '51', '55'];

  if (!validPrefixes.includes(prefix)) {
    return false;
  }

  const multipliers = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanStr[i], 10) * multipliers[i];
  }

  let checkDigit = 11 - (sum % 11);

  if (checkDigit === 11) {
    checkDigit = 0;
  } else if (checkDigit === 10) {
    checkDigit = 9;
  }

  const providedCheckDigit = parseInt(cleanStr[10], 10);

  return checkDigit === providedCheckDigit;
}

export { validateTaxId };
