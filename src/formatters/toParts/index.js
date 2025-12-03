/**
 * Formats a number into parts based on the locale.
 *
 * @param {number|string} number - The number to format.
 * @param {string} [locale='en-US'] - The locale to use for formatting.
 * @param {Intl.NumberFormatOptions} [options={}] - Options for Intl.NumberFormat.
 * @returns {Intl.NumberFormatPart[]} An array of objects representing the number parts.
 */
export function toParts(number, locale = 'en-US', options = {}) {
  const num = Number(number);
  if (isNaN(num)) {
    throw new Error('Invalid number input');
  }

  return new Intl.NumberFormat(locale, options).formatToParts(num);
}
