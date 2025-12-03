import { toString } from '../../utils/index.js';
import { getLocaleData } from '../../i18n/index.js';

/**
 * Formats the numeric part of a monetary value.
 * @param {number} num - The number (e.g., 1234.56).
 * @param {number} decimalDigits - Number of decimal digits (e.g., 2).
 * @param {string} decimalSep - Decimal separator (e.g., ',').
 * @param {string} thousandSep - Thousands separator (e.g., '.').
 * @returns {string} (e.g., "1.234,56").
 */
function _formatAmount(num, decimalDigits, decimalSep, thousandSep) {
  const fixedNum = num.toFixed(decimalDigits);

  const parts = fixedNum.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || '';

  const integerFormatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);

  return integerFormatted + (decimalPart ? decimalSep + decimalPart : '');
}

/**
 * Applies a locale-aware currency formatting mask to a number.
 * @param {string|number} value - The value to format (e.g., 1234.56 or "1234.56").
 * @param {object} [options={}] - Options (must contain 'locale').
 * @returns {string | null} The formatted string (e.g., "R$ 1.234,56")
 * or 'null' if the input is invalid.
 */
export function formatCurrency(value, options = {}) {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return null;
  }
  const num = parseFloat(toString(value));
  if (isNaN(num)) {
    return null;
  }

  const lang = options.locale;
  if (!lang) {
    return null;
  }

  const localeData = getLocaleData(lang);
  const currencyRules = localeData?.currency;
  const separatorRules = localeData?.separators;

  if (!currencyRules || !separatorRules) {
    return null;
  }

  const isNegative = num < 0;
  const absNum = Math.abs(num);
  const amountStr = _formatAmount(
    absNum,
    currencyRules.decimal_digits,
    separatorRules.decimal,
    separatorRules.thousand
  );

  const symbol = currencyRules.symbol;
  const space = currencyRules.space_between_symbol_and_digits ? ' ' : '';

  let formattedValue;

  if (isNegative) {
    const format = currencyRules.negative_format[0] || '-{symbol}{amount}';
    formattedValue = format
      .replace(/{symbol}/g, symbol)
      .replace(/{space}/g, space)
      .replace(/{amount}/g, amountStr);
  } else {
    if (currencyRules.symbol_before_digits) {
      formattedValue = symbol + space + amountStr;
    } else {
      formattedValue = amountStr + space + symbol;
    }
  }

  return formattedValue;
}
