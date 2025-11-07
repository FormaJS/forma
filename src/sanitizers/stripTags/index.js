import { toString } from '../../utils/index.js';
import { simpleTagRegex, complexTagRegex } from '../../utils/regexConstants.js';

/**
 * Remove HTML/XML tags from a string, optionally preserving a whitelist of tags.
 * @param {string} str - The string to be cleaned.
 * @param {object} [options={}] - Sanitization options.
 * @param {string[]} [options.allowTags] - Array of tag names to keep (e.g. ['p', 'strong']).
 * @returns {string} The transformed string (without tags).
 */
export function stripTags(str, options = {}) {
  const s = toString(str);
  const { allowTags } = options;

  if (!Array.isArray(allowTags) || allowTags.length === 0) {
    return s.replace(simpleTagRegex, '');
  }

  const allowedSet = new Set(allowTags.map((tag) => tag.toLowerCase()));

  return s.replace(complexTagRegex, (match, isClosingSlash, tagName) => {
    if (allowedSet.has(tagName.toLowerCase())) {
      return match;
    }

    return '';
  });
}
