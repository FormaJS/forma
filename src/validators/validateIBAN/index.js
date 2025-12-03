import { isString, toString, ibanFormatRegex } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

// Table of IBAN lengths by country code (ISO 3166-1 alpha-2)
const ibanCountryLengths = {
  AL: 28,
  AD: 24,
  AT: 20,
  AZ: 28,
  BH: 22,
  BY: 28,
  BE: 16,
  BA: 20,
  BR: 29,
  BG: 22,
  CR: 22,
  HR: 21,
  CY: 28,
  CZ: 24,
  DK: 18,
  DO: 28,
  EG: 29,
  EE: 20,
  FO: 18,
  FI: 18,
  FR: 27,
  GE: 22,
  DE: 22,
  GI: 23,
  GR: 27,
  GL: 18,
  GT: 28,
  HU: 28,
  IS: 26,
  IQ: 23,
  IE: 22,
  IL: 23,
  IT: 27,
  JO: 30,
  KZ: 20,
  KW: 30,
  LV: 21,
  LB: 28,
  LI: 21,
  LT: 20,
  LU: 20,
  MT: 31,
  MR: 27,
  MU: 30,
  MC: 27,
  MD: 24,
  ME: 22,
  NL: 18,
  MK: 19,
  NO: 15,
  PK: 24,
  PS: 29,
  PL: 28,
  PT: 25,
  QA: 29,
  RO: 24,
  SM: 27,
  SA: 24,
  RS: 22,
  SK: 24,
  SI: 19,
  ES: 24,
  SE: 24,
  CH: 21,
  TL: 23,
  TN: 24,
  TR: 26,
  UA: 29,
  AE: 23,
  GB: 22,
  VG: 24,
};

/**
 * Validates the IBAN checksum (MOD-97 algorithm)
 * @param {string} str - The IBAN (uppercase, no spaces)
 * @returns {boolean} True if the checksum is valid
 */
function _isValidIBANChecksum(str) {
  const reordered = str.slice(4) + str.slice(0, 4);

  const numericStr = reordered.replace(/[A-Z]/g, (char) => {
    return char.charCodeAt(0) - 55;
  });

  try {
    return BigInt(numericStr) % 97n === 1n;
  } catch {
    return false;
  }
}

/**
 * Validates if the string is a valid IBAN (International Bank Account Number).
 * @param {string} str - String to be validated
 * @param {object} [options={}] - Options
 * @param {string[]} [options.whitelist] - List of allowed country codes (ISO 3166-1) (e.g., ['PT', 'DE']).
 * @param {string[]} [options.blacklist] - List of forbidden country codes (ISO 3166-1) (e.g., ['BR']).
 * @returns {ValidationResult} Validation result object
 */
export function validateIBAN(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const testStr = toString(str).replace(/\s/g, '').toUpperCase();

  if (!ibanFormatRegex.test(testStr)) {
    return { valid: false, error: 'validateIBANFormat' };
  }

  const countryCode = testStr.slice(0, 2);
  const expectedLength = ibanCountryLengths[countryCode];
  if (!expectedLength || testStr.length !== expectedLength) {
    return { valid: false, error: 'validateIBANFormat' };
  }

  const { whitelist, blacklist } = options;

  if (Array.isArray(blacklist) && blacklist.length > 0) {
    const upperBlacklist = blacklist.map((c) => c.toUpperCase());
    if (upperBlacklist.includes(countryCode)) {
      return {
        valid: false,
        error: 'validateIBANBlacklist',
        context: { country: countryCode },
      };
    }
  }

  if (Array.isArray(whitelist) && whitelist.length > 0) {
    const upperWhitelist = whitelist.map((c) => c.toUpperCase());
    if (!upperWhitelist.includes(countryCode)) {
      return { valid: false, error: 'validateIBANWhitelist' };
    }
  }

  if (!_isValidIBANChecksum(testStr)) {
    return { valid: false, error: 'validateIBANChecksum' };
  }

  return { valid: true };
}
