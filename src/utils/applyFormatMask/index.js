import { toString } from '../toString/index.js';
import { normalizeString } from '../normalizeString/index.js';

/**
 * Applies a format mask to a string with support for multiple placeholders:
 * - '#' matches digits (0-9)
 * - 'A' matches uppercase letters
 * - 'a' matches lowercase letters
 * - '*' matches any alphanumeric character (letter or digit)
 * - Any other character is treated as a literal
 *
 * Examples:
 * applyFormatMask('09010140', '#####-###') // => '09010-140'
 * applyFormatMask('SW1A1AA', 'AA## #AA') // => 'SW1A 1AA'
 * applyFormatMask('12345678Z', '########A') // => '12345678Z'
 *
 * @param {string} input - Input string to be masked.
 * @param {string} mask - Mask pattern using placeholders.
 * @param {{ normalize?: boolean }} [options] - Optional normalization.
 * @returns {string} The masked string.
 */
export function applyFormatMask(input, mask, options = {}) {
  input = toString(input);

  if (options.normalize) {
    input = normalizeString(input);
  }

  let inputIndex = 0;
  let result = '';
  let maskIndex = 0;

  while (maskIndex < mask.length) {
    const maskChar = mask[maskIndex];
    const inputChar = input[inputIndex];

    if (inputIndex >= input.length) {
      const hasPlaceholdersAhead = mask.slice(maskIndex).match(/[#Aa*]/);

      if (hasPlaceholdersAhead) {
        break;
      } else if (maskChar !== '#' && maskChar !== 'A' && maskChar !== 'a' && maskChar !== '*') {
        result += maskChar;
        maskIndex++;
        continue;
      } else {
        break;
      }
    }

    if (maskChar === '#') {
      if (/\d/.test(inputChar)) {
        result += inputChar;
        inputIndex++;
        maskIndex++;
      } else {
        inputIndex++;
      }
    } else if (maskChar === 'A') {
      if (/\p{L}/u.test(inputChar)) {
        result += inputChar.toUpperCase();
        inputIndex++;
        maskIndex++;
      } else {
        inputIndex++;
      }
    } else if (maskChar === 'a') {
      if (/\p{L}/u.test(inputChar)) {
        result += inputChar.toLowerCase();
        inputIndex++;
        maskIndex++;
      } else {
        inputIndex++;
      }
    } else if (maskChar === '*') {
      if (/[\p{L}\d]/u.test(inputChar)) {
        result += inputChar;
        inputIndex++;
        maskIndex++;
      } else {
        inputIndex++;
      }
    } else {
      result += maskChar;
      maskIndex++;
    }
  }

  return result;
}
