import { isString, toString } from '../../utils/index.js';
import { validateIP } from '../validateIP/index.js';
import { tldAscii, tldInternational } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

const tldRegex = new RegExp(`\\.${tldAscii}$`);
const tldInternationalRegex = new RegExp(`\\.${tldInternational}$`, 'u');

/**
 * Validates if the string is a valid URL.
 * @param {string} str - String to be validated
 * @param {object} [options={}] - Validation options.
 * @param {string[]} [options.protocols=['http', 'https', 'ftp']] - List of allowed protocols (e.g., 'http', 'https').
 * @param {boolean} [options.requireProtocol=false] - If true, the URL must include a protocol (e.g., 'http://').
 * @param {boolean} [options.requireTLD=true] - If true, the domain must have a TLD (e.g., .com). Ignored if 'allowLocalhost' is true.
 * @param {boolean} [options.allowIPDomain=true] - If true, allows domains that are IP addresses (e.g., 'http://127.0.0.1').
 * @param {boolean} [options.allowLocalhost=true] - If true, allows the 'localhost' hostname.
 * @param {boolean} [options.allowFragments=true] - If true, allows fragments (e.g., ...page.html#section1).
 * @param {boolean} [options.allowQueryParams=true] - If true, allows query params (e.g., ...search?q=test).
 * @param {boolean} [options.allowAuthentication=false] - If true, allows credentials in the URL (e.g., 'user:pass@example.com').
 * @param {boolean} [options.allowUTF8Domains=true] - If true, allows Unicode characters in the domain (for international TLDs).
 * @param {boolean} [options.ignoreMaxLength=false] - If true, ignores the maximum length check of 254 characters.
 * @returns {ValidationResult} Validation result object
 */
export function validateURL(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }
  let testStr = toString(str).trim();
  if (testStr === '') {
    return { valid: false, error: 'isEmpty' };
  }

  const defaults = {
    protocols: ['http', 'https', 'ftp'],
    requireProtocol: false,
    requireTLD: true,
    allowIPDomain: true,
    allowLocalhost: true,
    allowFragments: true,
    allowQueryParams: true,
    allowAuthentication: false,
    allowUTF8Domains: true,
    ignoreMaxLength: false,
  };
  const opt = { ...defaults, ...options };

  if (!testStr.includes('://')) {
    if (opt.requireProtocol) {
      return { valid: false, error: 'validateURLProtocolRequired' };
    }
    testStr = `http://${testStr}`;
  }

  let url;
  try {
    url = new URL(testStr);
  } catch {
    return { valid: false, error: 'validateURL' };
  }

  const protocol = url.protocol.replace(/:$/, '');
  if (!opt.protocols.includes(protocol.toLowerCase())) {
    return { valid: false, error: 'validateURLProtocolNotAllowed', context: { protocol } };
  }

  if (!opt.allowAuthentication && (url.username || url.password)) {
    return { valid: false, error: 'validateURLAuthNotAllowed' };
  }

  if (!opt.allowFragments && url.hash) {
    return { valid: false, error: 'validateURLFragmentsNotAllowed' };
  }

  if (!opt.allowQueryParams && url.search) {
    return { valid: false, error: 'validateURLQueryNotAllowed' };
  }

  const host = url.hostname;

  if (opt.allowLocalhost && host === 'localhost') {
    return { valid: true };
  }

  const ipResult = validateIP(host);

  if (ipResult.valid) {
    if (!opt.allowIPDomain) {
      return { valid: false, error: 'validateURLIPNotAllowed' };
    }
  } else {
    if (opt.requireTLD) {
      const tldCheck = opt.allowUTF8Domains ? tldInternationalRegex : tldRegex;

      if (!tldCheck.test(host)) {
        return { valid: false, error: 'validateURLTLDRequired' };
      }
    }
  }

  return { valid: true };
}
