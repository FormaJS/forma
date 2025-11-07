import { toString } from '../../utils/index.js';
import { htmlUnescapes, unescapeRegex } from '../../utils/index.js';

/**
 * Convert basic HTML entities ('&amp;', '&lt;', '&gt;', '&quot;', '&#x27;')
 * into their corresponding characters ('&', '<', '>', '"', "'").
 * @param {string} str - The string to be unescaped.
 * @returns {string} The transformed (unescaped) string.
 */
export function unescapeHTML(str) {
  const s = toString(str);

  return s.replace(unescapeRegex, (match) => {
    return htmlUnescapes[match];
  });
}
