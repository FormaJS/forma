import { typeOf } from '../typeOf';

/**
 * Safely converts a value to string.
 * Treats null and undefined as an empty string.
 * @param {*} val - The value to convert.
 * @returns {string} The value converted to string.
 */
export function toString(val) {
    if (val === null || typeOf(val) === 'undefined') {
        return '';
    }

    return String(val);
}
