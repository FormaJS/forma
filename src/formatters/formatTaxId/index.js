import { toString, applyFormatMask } from '../../utils/index.js';
import { getLocaleData } from '../../i18n/index.js';

/**
 * Applies a locale-aware Tax ID formatting mask based on a 'type'.
 * @param {string} str - The string to format (e.g., "12345678901").
 * @param {object} [options={}] - Options.
 * @param {string} [options.type] - The ID type (e.g., 'CPF', 'CNPJ', 'SSN'). **Required.**
 * @returns {string} The formatted string (e.g., "123.456.789-01") or the cleaned digits.
 */
export function formatTaxId(str, options = {}) {
  const digits = toString(str).replace(/\D/g, '');

  const lang = options.locale;
  const type = options.type;

  if (!lang || !type) {
    return digits;
  }

  const localeData = getLocaleData(lang);
  const mask = localeData?.masks?.taxId?.[type.toUpperCase()];

  if (!mask) {
    return digits;
  }

  const expectedDigits = (mask.match(/#/g) || []).length;

  if (digits.length === expectedDigits) {
    return applyFormatMask(digits, mask);
  }

  return digits;
}
