/**
 * Normalizes the locale to the format xx-XX (e.g., pt-BR, en-US)
 * @param {string} locale - Locale to normalize
 * @returns {string} Normalized locale or empty string if invalid
 */
export function normalizeLocale(locale) {
  if (typeof locale !== 'string') return '';
  // Aceita xx-xx, xx_xx, xx-XX, xx_XX, xxXX
  const match = locale.match(/^([a-zA-Z]{2})[-_]?([a-zA-Z]{2})$/);
  if (!match) return '';
  return `${match[1].toLowerCase()}-${match[2].toUpperCase()}`;
}
