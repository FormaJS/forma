import { toString } from '../toString/index.js';

/**
 * Escapes special characters for use in a RegExp Character Class ([]).
 * The only characters that *must* be escaped inside [] are: \ (backslash), ] (closing bracket), and - (hyphen).
 * @param {string} str - The string containing the characters to escape.
 * @returns {string} The string with RegExp characters escaped.
 */
export function escapeRegExpCharClass(str) {
    return toString(str).replace(/[\\\]-]/g, '\\$&');
}
