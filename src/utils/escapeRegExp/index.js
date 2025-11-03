import { toString } from '../toString/index.js';

/**
 * Escape special RegExp characters in a string.
 * @param {string} str - The string to escape.
 * @returns {string} The string with RegExp characters escaped.
 */
export function escapeRegExp(str) {
    return toString(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
