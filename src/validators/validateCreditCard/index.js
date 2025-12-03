import { isString, toString, luhnCheck, getCreditCardPatterns } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Checks if the string is a valid credit card number.
 * Validates length (13-19), Luhn algorithm, and optionally the provider.
 * @param {string} str - String to validate.
 * @param {object} [options={}] - Options.
 * @param {string} [options.provider] - Specific provider name (e.g., 'visa'). Case-insensitive.
 * @returns {ValidationResult} Validation result object.
 */
export function validateCreditCard(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const defaults = {
    provider: undefined,
  };
  const opt = { ...defaults, ...options };

  const digits = toString(str).replace(/[\s-]/g, '');

  if (!/^\d+$/.test(digits) || digits.length < 13 || digits.length > 19) {
    return { valid: false, error: 'validateCreditCardLength' };
  }

  if (!luhnCheck(digits)) {
    return { valid: false, error: 'validateCreditCardChecksum' };
  }

  const patterns = getCreditCardPatterns(opt.locale);
  if (!patterns || Object.keys(patterns).length === 0) {
    return { valid: true };
  }

  if (opt.provider) {
    const providerKey = opt.provider.toLowerCase();
    const providerPatternData = patterns[providerKey];

    if (!providerPatternData || !providerPatternData.pattern) {
      return {
        valid: false,
        error: 'validateCreditCardUnknownProvider',
        context: { provider: opt.provider },
      };
    }

    try {
      const providerRegex = new RegExp(
        providerPatternData.pattern,
        providerPatternData.flags || ''
      );
      if (providerRegex.test(digits)) {
        return { valid: true };
      } else {
        return {
          valid: false,
          error: 'validateCreditCardProviderMismatch',
          context: { provider: opt.provider },
        };
      }
    } catch {
      return {
        valid: false,
        error: 'genericError',
        context: { details: `Regex failed for ${providerKey}` },
      };
    }
  } else {
    for (const key in patterns) {
      const patternData = patterns[key];
      if (patternData && patternData.pattern) {
        try {
          const regex = new RegExp(patternData.pattern, patternData.flags || '');
          if (regex.test(digits)) {
            return { valid: true };
          }
        } catch {
          continue;
        }
      }
    }

    return { valid: false, error: 'validateCreditCardGeneric' };
  }
}
