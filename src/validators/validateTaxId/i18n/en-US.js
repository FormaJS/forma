import { isString, toString } from '../../../utils/index.js';

const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
const einRegex = /^\d{2}-\d{7}$/;
const itinRegex = /^9\d{2}-\d{2}-\d{4}$/;

/**
 * Validates a SSN (Social Security Number).
 * Checks format and basic rules.
 * @param {string} ssn - The SSN to validate (format ###-##-####).
 * @returns {boolean} True if the SSN is valid.
 */
function _validateSSN(ssn) {
  if (!ssnRegex.test(ssn)) {
    return false;
  }
  const area = ssn.slice(0, 3);
  const group = ssn.slice(4, 6);
  const serial = ssn.slice(7, 11);
  if (area === '000' || area === '666' || parseInt(area, 10) >= 900) {
    return false;
  }
  if (group === '00') {
    return false;
  }
  if (serial === '0000') {
    return false;
  }
  return true;
}

/**
 * Validates an EIN (Employer Identification Number).
 * Checks only the format ##-#######.
 * @param {string} ein - The EIN to validate.
 * @returns {boolean} True if the EIN format is valid.
 */
function _validateEIN(ein) {
  if (!einRegex.test(ein)) {
    return false;
  }
  // We could add EIN valid prefix validation here
  // But the list is extensive and changes frequently, so we only validate the format.
  return true;
}

/**
 * Validates an ITIN (Individual Taxpayer Identification Number).
 * Checks format 9##-##-#### and the central group range.
 * @param {string} itin - The ITIN to validate.
 * @returns {boolean} True if the ITIN is valid.
 */
function _validateITIN(itin) {
  if (!itinRegex.test(itin)) {
    return false;
  }
  const group = parseInt(itin.slice(4, 6), 10);
  if (
    (group >= 70 && group <= 88) ||
    (group >= 90 && group <= 92) ||
    (group >= 94 && group <= 99)
  ) {
    return true;
  }
  return false;
}

/**
 * Validates common US Tax ID formats (SSN, EIN, ITIN).
 * Cleans the string, checks length, and calls specific validators.
 * @param {string} tin - The Tax ID to validate (may contain formatting).
 * @returns {boolean} True if it is a valid SSN, EIN, or ITIN.
 * @example
 * validateTaxId('123-45-6789') // true (SSN)
 * validateTaxId('12-3456789')  // true (EIN)
 * validateTaxId('912-70-0000') // true (ITIN)
 */
function validateTaxId(tin) {
  if (!isString(tin)) {
    return false;
  }
  const testStr = toString(tin);

  if (einRegex.test(testStr)) {
    return _validateEIN(testStr);
  }
  if (itinRegex.test(testStr)) {
    return _validateITIN(testStr);
  }
  if (ssnRegex.test(testStr)) {
    return _validateSSN(testStr);
  }

  const cleanTin = testStr.replace(/\D/g, '');

  if (cleanTin.length !== 9) {
    return false;
  }

  const itinFormatted = `${cleanTin.slice(0, 3)}-${cleanTin.slice(3, 5)}-${cleanTin.slice(5, 9)}`;
  if (cleanTin.startsWith('9') && _validateITIN(itinFormatted)) {
    return true;
  }

  const ssnFormatted = `${cleanTin.slice(0, 3)}-${cleanTin.slice(3, 5)}-${cleanTin.slice(5, 9)}`;
  if (_validateSSN(ssnFormatted)) {
    return true;
  }

  const einFormatted = `${cleanTin.slice(0, 2)}-${cleanTin.slice(2, 9)}`;
  if (_validateEIN(einFormatted)) {
    return true;
  }

  return false;
}

export { validateTaxId };
