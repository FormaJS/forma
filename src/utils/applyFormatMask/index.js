import { toString } from '../toString/index.js';

/**
 * Applies a format mask (where '#' is a digit) to a string of digits.
 * @param {string} digits - The string of digits (e.g., "09010140")
 * @param {string} mask - The format mask (e.g., "#####-###")
 * @returns {string} (e.g., "09010-140")
 */
export function applyFormatMask(digits, mask) {
    digits = toString(digits);
    let i = 0;
    let result = '';

    for (const maskChar of mask) {
        if (i >= digits.length) {
            break;
        }

        if (maskChar === '#') {
            result += digits[i++];
        } else {
            result += maskChar;
        }
    }
    return result;
}
