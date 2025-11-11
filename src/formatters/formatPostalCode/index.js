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
 * Applies postal code formatting mask (locale-aware) to a string.
 * Supports alphanumeric postal codes (e.g., UK: "SW1A 1AA").
 *
 * @param {string} str - The string to be formatted (e.g., "09010140" or "SW1A1AA")
 * @param {object} [options={}] - Options
 * @param {string} options.locale - The locale for formatting
 * @param {boolean} [options.normalize=false] - If true, normalizes accented characters
 * @returns {string} The formatted string (e.g., "09010-140" or "SW1A 1AA")
 * or the cleaned input if no format is applicable
 *
 * @example
 * formatPostalCode('09010140', { locale: 'pt-BR' }) // => '09010-140'
 * formatPostalCode('SW1A1AA', { locale: 'en-UK' }) // => 'SW1A 1AA'
 * formatPostalCode('H2X1Y4', { locale: 'fr-CA' }) // => 'H2X 1Y4'
 */
export function formatPostalCode(str, options = {}) {
  // Clean input: remove spaces, hyphens, but keep alphanumeric
  const cleaned = toString(str).replace(/[\s-]/g, '').toUpperCase();

  const lang = options.locale;
  if (!lang) {
    return cleaned;
  }

  // Special handling for UK postcodes (variable format)
  // UK format: outward code (2-4 chars) + space + inward code (3 chars always)
  if (lang === 'en-UK' || lang === 'en-GB') {
    if (cleaned.length >= 5 && cleaned.length <= 7) {
      // Inward code is always last 3 characters
      const inward = cleaned.slice(-3);
      const outward = cleaned.slice(0, -3);
      return `${outward} ${inward}`;
    }
    return cleaned;
  }

  const localeData = getLocaleData(lang);
  const maskObj = localeData?.masks?.postalcode;

  if (!maskObj || typeof maskObj !== 'object') {
    return cleaned;
  }

  const mask = maskObj.default;

  if (!mask) {
    return cleaned;
  }

  const expectedChars = countPlaceholders(mask);

  if (cleaned.length === expectedChars) {
    return applyFormatMask(cleaned, mask, { normalize: options.normalize });
  }

  return cleaned;
}
