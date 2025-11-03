import { isString, toString } from '../../utils/index.js';
import { validateIP } from '../validateIP/index.js';
import { ipv4Address, ipv6Address } from '../../utils/regexConstants.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

const ipv4Regex = new RegExp(`^${ipv4Address}$`);
const ipv6Regex = new RegExp(`^${ipv6Address}$`);

/**
 * Validates if the string is a CIDR IP range (IPv4 or IPv6).
 * @param {string} str - String to validate (e.g., "192.168.1.0/24")
 * @param {object} [options={}] - Options
 * @param {string|number} [options.version] - Forces validation ('4' or '6').
 * @returns {ValidationResult} Validation result object
 */
export function validateIPRange(str, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }
    const testStr = toString(str);
    const version = toString(options.version);

    const parts = testStr.split('/');
    if (parts.length !== 2) {
        return { valid: false, error: 'validateIPRange' };
    }

    const ip = parts[0];
    const maskStr = parts[1];

    const ipResult = validateIP(ip, options);
    if (!ipResult.valid) {
        if (version === '4') return { valid: false, error: 'validateIPRangeV4' };
        if (version === '6') return { valid: false, error: 'validateIPRangeV6' };
        return { valid: false, error: 'validateIPRange' };
    }

    if (!/^\d+$/.test(maskStr)) {
        return { valid: false, error: 'validateIPRange' };
    }
    const mask = parseInt(maskStr, 10);

    let ipVersion;
    if (version === '4' || version === '6') {
        ipVersion = version;
    } else {
        if (ipv4Regex.test(ip)) ipVersion = '4';
        else if (ipv6Regex.test(ip)) ipVersion = '6';
        else return { valid: false, error: 'validateIPRange' };
    }

    if (ipVersion === '4') {
        if (mask >= 0 && mask <= 32) {
            return { valid: true };
        }
        return { valid: false, error: 'validateIPRangeV4' };
    }

    if (ipVersion === '6') {
        if (mask >= 0 && mask <= 128) {
            return { valid: true };
        }
        return { valid: false, error: 'validateIPRangeV6' };
    }

    return { valid: false, error: 'validateIPRange' };
}
