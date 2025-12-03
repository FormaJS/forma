import { isString, toString } from '../../utils/index.js';
import { getLocaleData } from '../../i18n/index.js';
import { getNormalizedNumberString } from '../../utils/getNormalizedNumberString/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is a valid number (locale-aware).
 * This is the "master" function used by validateInt, validateFloat, etc.
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options
 * @param {string} [options.locale] - Locale for formatting (e.g., 'pt-BR')
 * @param {number} [options.minRange] - Minimum numeric value
 * @param {number} [options.maxRange] - Maximum numeric value
 * @param {boolean} [options.strict=false] - If true, limits (min/max) are not included.
 * @param {boolean} [options.allowDecimal=true] - If false, fails if there are decimals.
 * @param {boolean} [options.requireDecimal=false] - If true, fails if there are NO decimals.
 * @returns {ValidationResult} Validation result object
 */
export function validateNumeric(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const testStr = toString(str);
  if (testStr.trim() === '') {
    return { valid: false, error: 'isEmpty' };
  }

  const {
    locale,
    minRange,
    maxRange,
    strict = false,
    allowDecimal = true,
    requireDecimal = false,
  } = options;

  // Default configuration: most common globally ~66% population
  let decimalSep = '.';
  let thousandSep = ',';

  if (locale) {
    const localeData = getLocaleData(locale);
    if (localeData && localeData.separators) {
      decimalSep = localeData.separators.decimal;
      thousandSep = localeData.separators.thousand;
    }
  }

  const escapedThousand = thousandSep && thousandSep !== decimalSep ? `\\${thousandSep}` : '';
  const escapedDecimal = `\\${decimalSep}`;

  const integerPart = `(\\d{1,3}(${escapedThousand}\\d{3})*|\\d+)`;
  const decimalPart = `(${escapedDecimal}\\d+)`;
  let regexPattern;

  if (!allowDecimal) {
    regexPattern = `^[-+]?${integerPart}$`;
  } else if (requireDecimal) {
    regexPattern = `^[-+]?(${integerPart}?${decimalPart})$`;
  } else {
    regexPattern = `^[-+]?((${integerPart}(${decimalPart})?)|(${decimalPart}))$`;
  }

  const numericRegex = new RegExp(regexPattern);

  if (!numericRegex.test(testStr)) {
    if (!allowDecimal) return { valid: false, error: 'validateNumericNotInt' };
    if (requireDecimal) return { valid: false, error: 'validateNumericNotDecimal' };
    return { valid: false, error: 'validateNumericFormat' };
  }

  const numStr = getNormalizedNumberString(testStr, locale);
  const num = Number(numStr);

  if (isNaN(num) || !isFinite(num)) {
    return { valid: false, error: 'validateNumericInvalid' };
  }

  if (typeof minRange !== 'undefined') {
    if (strict ? num <= minRange : num < minRange) {
      const error = strict ? 'validateNumericRangeMinStrict' : 'validateNumericRangeMin';
      return { valid: false, error, context: { minRange } };
    }
  }

  if (typeof maxRange !== 'undefined') {
    if (strict ? num >= maxRange : num > maxRange) {
      const error = strict ? 'validateNumericRangeMaxStrict' : 'validateNumericRangeMax';
      return { valid: false, error, context: { maxRange } };
    }
  }

  return { valid: true };
}
