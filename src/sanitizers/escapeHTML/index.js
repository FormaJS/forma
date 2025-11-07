import { toString } from '../../utils/index.js';
import { htmlEscapes, escapeRegex } from '../../utils/index.js';

/**
 * Convert special HTML characters ('&', '<', '>', '"', "'") to
 * their corresponding HTML entities.
 * @param {string} str - The string to be escaped.
 * @returns {string} The transformed (escaped) string.
 */
export function escapeHTML(str) {
  const s = toString(str);

  return s.replace(escapeRegex, (match) => {
    return htmlEscapes[match];
  });
}
