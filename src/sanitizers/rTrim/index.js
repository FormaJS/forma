import { toString, isString, escapeRegExpCharClass } from '../../utils/index.js';

/**
 * Remove whitespace (or custom characters) from the end (right) of the string.
 * @param {string} str - The string to be trimmed.
 * @param {object} [options={}] - Options (e.g. { chars: '_-' }).
 * @returns {string} The transformed string.
 */
export function rTrim(str, options = {}) {
  const testStr = toString(str);

  if (options && isString(options.chars)) {
    if (options.chars.length === 0) return testStr;

    const escapedChars = escapeRegExpCharClass(options.chars);
    const regex = new RegExp(`[${escapedChars}]+$`, 'g');

    return testStr.replace(regex, '');
  }

  return testStr.trimEnd();
}
