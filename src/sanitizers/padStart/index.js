import { toString } from '../../utils/index.js';

/**
 * Adds padding to the beginning of the string until it reaches the target length.
 * @param {string} str - The string to be padded.
 * @param {object} [options={}] - Sanitization options.
 * @param {number} [options.length] - The target final length of the string.
 * @param {string} [options.char=' '] - The character to use for padding.
 * @returns {string} The transformed string.
 */
export function padStart(str, options = {}) {
    const s = toString(str);

    const defaults = {
        length: undefined,
        char: ' ',
    };
    const opt = { ...defaults, ...options };

    if (typeof opt.length === 'undefined' || opt.length === null) {
        return s;
    }

    return s.padStart(opt.length, opt.char);
}
