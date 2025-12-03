import {
  isString,
  toString,
  isValidISODateString,
  executeI18nValidationRule,
} from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates ISO 3166-1 codes (alpha-2 or alpha-3).
 * @param {string} str - String to validate.
 * @param {object} options - Options (alpha, caseSensitive, locale).
 * @returns {ValidationResult} Validation result object.
 */
async function _validateISO3166_1(str, options) {
  const { alpha, caseSensitive, locale } = options;
  let isValid = false;
  let errorKey = 'validateISO_3166-1';
  let context = {};

  try {
    const patternKey2 = 'ISO3166-1-alpha-2';
    const patternKey3 = 'ISO3166-1-alpha-3';

    const res2 = await executeI18nValidationRule(locale || 'en-US', patternKey2, str, {
      caseSensitive,
    });
    const res3 = await executeI18nValidationRule(locale || 'en-US', patternKey3, str, {
      caseSensitive,
    });

    const has2 = !(res2 && res2.error === 'invalidRule');
    const has3 = !(res3 && res3.error === 'invalidRule');

    const valid2 = (res2 && res2.valid) || res2 === true;
    const valid3 = (res3 && res3.valid) || res3 === true;

    if (alpha === '2' && has2) {
      isValid = valid2;
      errorKey = 'validateISO_ISO3166-1-alpha-2';
    } else if (alpha === '3' && has3) {
      isValid = valid3;
      errorKey = 'validateISO_ISO3166-1-alpha-3';
    } else if (!alpha && has2 && has3) {
      isValid = valid2 || valid3;
    } else {
      isValid = false;
      errorKey = 'invalidRule';
      context = { rule: `ISO3166-1-alpha-${alpha || '2/3'}` };
    }
    return isValid ? { valid: true } : { valid: false, error: errorKey, context };
  } catch (e) {
    return { valid: false, error: 'genericError', context: { details: e && e.message } };
  }
}

/**
 * Validates dates/times in ISO 8601 format.
 * @param {string} str - String to validate.
 * @param {object} options - Options (strict).
 * @returns {ValidationResult} Validation result object.
 */
function _validateISO8601(str, options) {
  const { strict } = options;
  const isValid = isValidISODateString(str, { strict });
  const errorKey = strict ? 'validateISO_8601_strict' : 'validateISO_8601_lenient';
  return isValid ? { valid: true } : { valid: false, error: errorKey };
}

/**
 * Validates simple ISO codes based on RegEx (639-1, 4217, etc.).
 * @param {string} str - String to validate.
 * @param {string} standardKey - The RegEx key in global.json (e.g., 'ISO639-1').
 * @param {object} options - Options (caseSensitive, locale).
 * @returns {ValidationResult} Validation result object.
 */
async function _validateSimpleISOCode(str, standardKey, options) {
  const { caseSensitive, locale } = options;
  const errorKey = `validateISO_${standardKey}`;
  let context = {};

  try {
    const res = await executeI18nValidationRule(locale, standardKey, str, { caseSensitive });

    if (res && res.error === 'invalidRule') {
      return { valid: false, error: 'invalidRule', context: { rule: standardKey } };
    }

    const isValid = (res && res.valid) || res === true;
    return isValid ? { valid: true } : { valid: false, error: errorKey, context };
  } catch (e) {
    return { valid: false, error: 'genericError', context: { details: e && e.message } };
  }
}

/**
 * Validates if the string matches a specified ISO standard.
 * @param {string} str - String to validate.
 * @param {object} [options={}] - Validation options.
 * @param {string} options.standard - The ISO standard to validate (e.g., '3166-1', '639-1', '8601'). **Required.**
 * @param {'2'|'3'} [options.alpha] - Used only with standard='3166-1' to specify alpha-2 or alpha-3. If omitted, accepts both.
 * @param {boolean} [options.caseSensitive=false] - If true, ISO code validation is case-sensitive.
 * @param {boolean} [options.strict=false] - Used only with standard='8601' for strict date format validation.
 * @returns {ValidationResult} Validation result object.
 */
export async function validateISO(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }
  const testStr = toString(str).trim();
  if (testStr === '') {
    return { valid: false, error: 'isEmpty' };
  }

  const defaults = {
    standard: undefined,
    alpha: undefined,
    caseSensitive: false,
    strict: false,
  };
  const opt = { ...defaults, ...options };

  if (!opt.standard) {
    return { valid: false, error: 'validateISOStandardRequired' };
  }

  switch (opt.standard.toUpperCase()) {
    case '3166-1':
      return await _validateISO3166_1(testStr, opt);
    case '8601':
      return _validateISO8601(testStr, opt);
    case '639-1':
      return await _validateSimpleISOCode(testStr, 'ISO639-1', opt);
    case '4217':
      return await _validateSimpleISOCode(testStr, 'ISO4217', opt);
    case '3166-1-ALPHA-2':
      return await _validateSimpleISOCode(testStr, 'ISO3166-1-alpha-2', opt);
    case '3166-1-ALPHA-3':
      return await _validateSimpleISOCode(testStr, 'ISO3166-1-alpha-3', opt);
    default:
      return {
        valid: false,
        error: 'validateISOUnknownStandard',
        context: { standard: opt.standard },
      };
  }
}
