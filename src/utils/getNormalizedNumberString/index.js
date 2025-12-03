import { getLocaleData } from '../../i18n/index.js';
import { toString } from '../toString/index.js';
import { escapeRegExp } from '../escapeRegExp/index.js';

/**
 * Converts a locale-aware formatted number string to a standard numeric string (with '.' as decimal).
 * @param {string} str - The string to normalize (e.g., "1.234,56")
 * @param {string} locale - The locale (e.g., 'pt-BR')
 * @returns {string} The normalized string (e.g., "1234.56")
 */
export function getNormalizedNumberString(str, locale) {
  let decimalSep = '.';
  let thousandSep = ',';

  if (locale) {
    const localeData = getLocaleData(locale);
    if (localeData && localeData.separators) {
      decimalSep = localeData.separators.decimal;
      thousandSep = localeData.separators.thousand;
    }
  }

  let numStr = toString(str);

  if (thousandSep && thousandSep !== decimalSep) {
    const thousandRegex = new RegExp(escapeRegExp(thousandSep), 'g');
    numStr = numStr.replace(thousandRegex, '');
  }

  if (decimalSep !== '.') {
    const decimalRegex = new RegExp(escapeRegExp(decimalSep), 'g');
    numStr = numStr.replace(decimalRegex, '.');
  }

  return numStr;
}
