import { isString, toString, escapeRegExp } from '../../utils/index.js';
import { getLocaleData } from '../../i18n/index.js';
import { validateNumeric } from '../validateNumeric/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * @typedef {object} ParseCurrencyResult
 * @property {boolean} isNegative - Indicates if a negative format was found.
 * @property {boolean} symbolFound - Indicates if the currency symbol was found.
 * @property {string|null} numericPart - The extracted numeric part.
 * @property {ValidationResult|null} errorResult - An error object, if any.
 */

/**
 * Attempts to parse the string to find a negative currency format.
 * @param {string} testStr
 * @param {object} opt - Combined options
 * @param {object} separators
 * @param {string} symbol
 * @returns {ParseCurrencyResult}
 */
function _parseNegativeCurrency(testStr, opt, separators, symbol) {
  let isNegative = false;
  let symbolFound = false;
  let numericPart = null;

  const escThousand = escapeRegExp(separators.thousand);
  const escDecimal = escapeRegExp(separators.decimal);

  const amountCapture = `(\\d{1,3}(?:${escThousand}\\d{3})*(?:${escDecimal}\\d+)?)`;

  const spacePattern = opt.spaceBetweenSymbolAndDigits ? '\\s+' : '';
  const symbolEscaped = symbol ? escapeRegExp(symbol) : '[\\p{Sc}]?';

  for (const fmt of opt.negativeFormats) {
    if (!isString(fmt)) continue;
    let fmtNorm = toString(fmt).replace(/%s/g, '{symbol}').replace(/%n/g, '{amount}');
    let pattern = fmtNorm.replace(/([()])/g, '\\$1');

    pattern = pattern
      .replace(/{symbol}/g, symbolEscaped)
      .replace(/{space}/g, spacePattern)
      .replace(/{amount}/g, amountCapture);

    const negRe = new RegExp('^\\s*' + pattern + '\\s*$', 'u');
    const m = testStr.match(negRe);

    if (m && m[1] !== undefined) {
      if (!opt.allowNegatives) {
        return {
          isNegative: true,
          symbolFound: false,
          numericPart: null,
          errorResult: {
            valid: false,
            error: 'validateCurrencyNegativeNotAllowed',
          },
        };
      }
      isNegative = true;
      symbolFound =
        symbolEscaped && symbolEscaped !== '[\\p{Sc}]?'
          ? new RegExp(symbolEscaped, 'u').test(m[0])
          : true;
      numericPart = m[1] ? m[1].trim() : null;
      break;
    }
  }

  if (!isNegative && opt.allowNegatives) {
    const plainNegPattern = `^\\s*-\\s*${amountCapture}\\s*$`;
    const plainNegRe = new RegExp(plainNegPattern, 'u');
    const m = testStr.match(plainNegRe);
    if (m && m[1] !== undefined) {
      isNegative = true;
      symbolFound = false;
      numericPart = m[1] ? m[1].trim() : null;
    }
  }

  return {
    isNegative,
    symbolFound,
    numericPart,
    errorResult: null,
  };
}

/**
 * Checks if the string represents a valid monetary value according to the locale.
 * @param {string} str - String to be validated.
 * @param {object} [options={}] - Validation options.
 * @param {string} [options.locale] - The locale to be used (e.g., 'pt-BR', 'en-US'). Essential for fetching formatting data.
 * @param {boolean} [options.allowNegatives=true] - Whether to allow negative values.
 * @param {string} [options.symbol] - Expected currency symbol. Default: (locale's symbol).
 * @param {boolean} [options.requireSymbol=false] - Whether the currency symbol is required.
 * @param {boolean} [options.symbolBeforeDigits] - Whether the symbol comes before the digits. Default: (locale config).
 * @param {boolean} [options.spaceBetweenSymbolAndDigits] - Whether there is space between symbol and digits. Default: (locale config).
 * @param {number} [options.decimalDigits] - Exact number of decimal digits allowed. Default: (locale config).
 * @param {string[]} [options.negativeFormats] - Allowed negative formats. Default: (locale config).
 * @returns {ValidationResult} Validation result object.
 */
export function validateCurrency(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'validateCurrencyInvalidType' };
  }
  let testStr = toString(str)
    .replace(/\u00A0/g, ' ')
    .trim();
  if (testStr === '') {
    return { valid: false, error: 'validateCurrencyIsEmpty' };
  }

  const locale = options.locale;
  const localeData = getLocaleData(locale);
  const currencyData = localeData?.currency;
  const separators = localeData?.separators;

  if (
    !locale ||
    !currencyData ||
    !separators ||
    !currencyData.symbol ||
    !Array.isArray(currencyData.negative_format) ||
    currencyData.decimal_digits === undefined
  ) {
    return { valid: false, error: 'validateCurrencyMissingLocaleData' };
  }

  const defaults = {
    allowNegatives: true,
    symbol: currencyData.symbol,
    requireSymbol: false,
    symbolBeforeDigits: currencyData.symbol_before_digits,
    spaceBetweenSymbolAndDigits: currencyData.space_between_symbol_and_digits,
    decimalDigits: currencyData.decimal_digits,
    negativeFormats: currencyData.negative_format,
  };
  const opt = { ...defaults, ...options };

  const negativeResult = _parseNegativeCurrency(testStr, opt, separators, opt.symbol);

  if (negativeResult.errorResult) {
    return negativeResult.errorResult;
  }

  let { isNegative, symbolFound, numericPart } = negativeResult;

  if (!isNegative) {
    const symbolEscaped = escapeRegExp(String(opt.symbol || ''));
    const spacePattern = opt.spaceBetweenSymbolAndDigits ? '\\s+' : '';
    const escThousand = escapeRegExp(separators.thousand);
    const escDecimal = escapeRegExp(separators.decimal);
    const amountPattern = `(\\d{1,3}(?:${escThousand}\\d{3})*(?:${escDecimal}\\d+)?)`;

    let positivePattern;
    if (opt.symbolBeforeDigits) {
      positivePattern = `^${symbolEscaped}${spacePattern}${amountPattern}$`;
    } else {
      positivePattern = `^${amountPattern}${spacePattern}${symbolEscaped}$`;
    }

    const match = testStr.match(new RegExp(positivePattern, 'u'));
    if (match && match[1] !== undefined) {
      symbolFound = true;
      numericPart = match[1].trim();
    } else {
      let fallbackNumericPart = null;
      if (opt.symbolBeforeDigits) {
        const expectedPrefix = `${opt.symbol}${opt.spaceBetweenSymbolAndDigits ? ' ' : ''}`;
        if (testStr.startsWith(expectedPrefix)) {
          let remaining = testStr.slice(expectedPrefix.length);
          let spacingOk = true;
          if (!opt.spaceBetweenSymbolAndDigits) {
            if (remaining.length > 0 && /\s/.test(remaining[0])) {
              spacingOk = false;
            }
          } else {
            remaining = remaining.trimStart();
          }
          if (spacingOk) {
            fallbackNumericPart = remaining.trim();
            symbolFound = true;
          }
        }
      } else {
        const expectedSuffix = `${opt.spaceBetweenSymbolAndDigits ? ' ' : ''}${opt.symbol}`;
        if (testStr.endsWith(expectedSuffix)) {
          let remaining = testStr.slice(0, -expectedSuffix.length);
          let spacingOk = true;
          if (!opt.spaceBetweenSymbolAndDigits) {
            if (remaining.length > 0 && /\s/.test(remaining[remaining.length - 1])) {
              spacingOk = false;
            }
          } else {
            remaining = remaining.trimEnd();
          }
          if (spacingOk) {
            fallbackNumericPart = remaining.trim();
            symbolFound = true;
          }
        }
      }

      if (fallbackNumericPart) {
        numericPart = fallbackNumericPart;
      } else if (testStr.includes(opt.symbol)) {
        return {
          valid: false,
          error: 'validateCurrencyInvalidFormat',
          context: { details: 'Symbol found but in wrong position/spacing' },
        };
      } else if (!opt.requireSymbol) {
        const noSymbolPattern = `^${amountPattern}$`;
        const noSymbolMatch = testStr.match(new RegExp(noSymbolPattern, 'u'));
        if (noSymbolMatch && noSymbolMatch[1] !== undefined) {
          numericPart = noSymbolMatch[1].trim();
          symbolFound = false;
        }
      }
    }
  }

  if (!numericPart) {
    if (opt.requireSymbol) {
      return {
        valid: false,
        error: 'validateCurrencySymbolRequired',
      };
    }
    return {
      valid: false,
      error: 'validateCurrencyInvalidAmount',
      context: { amount: testStr },
    };
  }

  const numericResult = validateNumeric(numericPart, {
    locale: locale,
    allowDecimal: true,
  });

  if (!numericResult.valid) {
    return {
      valid: false,
      error: 'validateCurrencyInvalidAmount',
      context: { ...(numericResult.context || {}), amount: numericPart },
    };
  }

  const decimalSeparator = separators.decimal;
  const decimalIndex = numericPart.lastIndexOf(decimalSeparator);
  const actualDecimalDigits = decimalIndex === -1 ? 0 : numericPart.length - decimalIndex - 1;

  if (actualDecimalDigits > opt.decimalDigits) {
    return {
      valid: false,
      error: 'validateCurrencyDecimalDigits',
      context: { expected: opt.decimalDigits, actual: actualDecimalDigits },
    };
  }

  if (opt.requireSymbol && !symbolFound) {
    return {
      valid: false,
      error: 'validateCurrencySymbolRequired',
    };
  }

  return { valid: true };
}
