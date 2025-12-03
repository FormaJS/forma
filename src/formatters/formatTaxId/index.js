import { toString, applyFormatMask } from '../../utils/index.js';
import { getLocaleData } from '../../i18n/index.js';

/**
 * Counts the number of placeholder characters in a mask.
 * Placeholders: '#' (digit), 'A' (letter), 'a' (letter), '*' (alphanumeric)
 * @param {string} mask - The format mask
 * @returns {number} The number of placeholders
 */
function countPlaceholders(mask) {
  return (mask.match(/[#Aa*]/g) || []).length;
}

/**
 * Applies a locale-aware Tax ID formatting mask based on a 'type'.
 * Supports alphanumeric tax IDs (e.g., UK NI: "AA 12 34 56 A").
 *
 * @param {string} str - The string to format (e.g., "12345678901" or "AB123456C")
 * @param {object} [options={}] - Options
 * @param {string} options.locale - The locale for formatting
 * @param {string} options.type - The ID type (e.g., 'CPF', 'CNPJ', 'NI'). **Required.**
 * @param {boolean} [options.normalize=false] - If true, normalizes accented characters
 * @returns {string} The formatted string (e.g., "123.456.789-01" or "AB 12 34 56 C")
 * or the cleaned input if no format is applicable
 *
 * @example
 * formatTaxId('12345678901', { locale: 'pt-BR', type: 'CPF' }) // => '123.456.789-01'
 * formatTaxId('AB123456C', { locale: 'en-UK', type: 'NI' }) // => 'AB 12 34 56 C'
 */
export function formatTaxId(str, options = {}) {
  const cleaned = toString(str)
    .replace(/[\s.\-/]/g, '')
    .toUpperCase();

  const lang = options.locale;
  const type = options.type;

  if (!lang || !type) {
    return cleaned;
  }

  const localeData = getLocaleData(lang);
  const mask = localeData?.masks?.taxId?.[type.toUpperCase()];

  if (!mask) {
    return cleaned;
  }

  const expectedChars = countPlaceholders(mask);

  if (cleaned.length === expectedChars) {
    return applyFormatMask(cleaned, mask, { normalize: options.normalize });
  }

  return cleaned;
}
