import { toString } from '../toString/index.js';

/**
 * Normalizes a string by removing accents and diacritics.
 * @param {string} str - The string to normalize
 * @returns {string} The normalized string
 * @example
 * normalizeString('São Paulo') // => 'Sao Paulo'
 * normalizeString('Montréal') // => 'Montreal'
 */
export function normalizeString(str) {
  str = toString(str);

  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
