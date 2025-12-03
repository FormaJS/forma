/**
 * Formats a number as a percentage.
 *
 * @param {number|string} number - The number to format.
 * @param {string} [locale='en-US'] - The locale to use for formatting.
 * @param {Intl.NumberFormatOptions} [options={}] - Options for Intl.NumberFormat.
 * @returns {string} The formatted percentage string.
 */
export function toPercentage(number, locale = 'en-US', options = {}) {
  const num = Number(number);
  if (isNaN(num)) {
    throw new Error('Invalid number input');
  }

  const defaultOptions = {
    style: 'percent',
    ...options,
  };

  return new Intl.NumberFormat(locale, defaultOptions).format(num);
}
