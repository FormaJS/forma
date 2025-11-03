import { isString, toString } from '../../utils/index.js';
import { ipv4Address, ipv6Address } from '../../utils/regexConstants.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

// Compiles the constants into anchored RegEx (^...$)
const ipv4Regex = new RegExp(`^${ipv4Address}$`);
const ipv6Regex = new RegExp(`^${ipv6Address}$`);

/**
 * Validates if the string is an IP address (IPv4 or IPv6).
 * @param {string} str - String to validate
 * @param {object} [options={}] - Options
 * @param {string|number} [options.version] - Forces validation ('4' or '6').
 * @returns {ValidationResult} Validation result object
 */
export function validateIP(str, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }
    const testStr = toString(str);

    const version = toString(options.version);

    if (version === '4') {
        if (ipv4Regex.test(testStr)) {
            return { valid: true };
        }
        return { valid: false, error: 'validateIPV4' };
    }

    if (version === '6') {
        if (ipv6Regex.test(testStr)) {
            return { valid: true };
        }
        return { valid: false, error: 'validateIPV6' };
    }

    if (ipv4Regex.test(testStr) || ipv6Regex.test(testStr)) {
        return { valid: true };
    }

    return { valid: false, error: 'validateIP' };
}
