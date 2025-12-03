import { isString, toString } from '../../../utils/index.js';

const ninoRegex = /^[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z]\d{6}[A-D]$/i;
const ninoInvalidPrefixes = ['BG', 'GB', 'NK', 'KN', 'TN', 'NT', 'ZZ'];

const utrRegex = /^\d{10}$/;

/**
 * Validates a UK National Insurance Number (NINO).
 * Checks format and rejects invalid prefixes.
 * @param {string} nino - The NINO to validate (format: AA######A).
 * @returns {boolean} True if the NINO is valid.
 */
function _validateNINO(nino) {
  if (!ninoRegex.test(nino)) {
    return false;
  }

  const prefix = nino.slice(0, 2).toUpperCase();

  if (ninoInvalidPrefixes.includes(prefix)) {
    return false;
  }

  const firstLetter = prefix[0];
  if (['D', 'F', 'I', 'Q', 'U', 'V'].includes(firstLetter)) {
    return false;
  }

  const secondLetter = prefix[1];
  if (['D', 'F', 'I', 'O', 'Q', 'U', 'V'].includes(secondLetter)) {
    return false;
  }

  return true;
}

/**
 * Validates a UK UTR (Unique Taxpayer Reference).
 * Checks format (10 digits) and applies modulo 11 check digit validation.
 * @param {string} utr - The UTR to validate.
 * @returns {boolean} True if the UTR is valid.
 */
function _validateUTR(utr) {
  if (!utrRegex.test(utr)) {
    return false;
  }

  const weights = [6, 7, 8, 9, 10, 5, 4, 3, 2];
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(utr[i], 10) * weights[i];
  }

  const remainder = sum % 11;
  let checkDigit;

  if (remainder === 0) {
    checkDigit = 0;
  } else {
    checkDigit = 11 - remainder;
  }

  if (checkDigit >= 10) {
    return false;
  }

  const lastDigit = parseInt(utr[9], 10);
  return checkDigit === lastDigit;
}

/**
 * Validates common UK Tax ID formats (NINO, UTR).
 * Cleans the string, checks format, and calls specific validators.
 * @param {string} tin - The Tax ID to validate (may contain formatting).
 * @returns {boolean} True if it is a valid NINO or UTR.
 * @example
 * validateTaxId('QQ123456C') // true (NINO)
 * validateTaxId('1234567890') // true (UTR)
 */
function validateTaxId(tin) {
  if (!isString(tin)) {
    return false;
  }

  let testStr = toString(tin).trim().toUpperCase();

  const cleanStr = testStr.replace(/[\s-]/g, '');

  if (cleanStr.length === 9 && /^[A-Z]{2}\d{6}[A-Z]$/.test(cleanStr)) {
    return _validateNINO(cleanStr);
  }

  if (cleanStr.length === 10 && /^\d{10}$/.test(cleanStr)) {
    return _validateUTR(cleanStr);
  }

  return false;
}

export { validateTaxId };
