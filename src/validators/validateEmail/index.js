import { isString, toString } from '../../utils/index.js';
import { validateIP } from '../validateIP/index.js';
import {
  displayNameRegex,
  localAscii,
  internationalChars,
  domainSegment,
  tldAscii,
  tldInternational,
} from '../../utils/regexConstants.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

// ASCII pattern (RFC 5322) for the local part.
const asciiLocalPartRegex = new RegExp(`^[${localAscii}]+(?:\\.[${localAscii}]+)*$`);
// UTF-8 pattern (allows Unicode letters)
const utf8LocalPartRegex = new RegExp(
  `^[${localAscii}${internationalChars}]+(?:\\.[${localAscii}${internationalChars}]+)*$`,
  'u'
);

// Hostname pattern (ASCII) - (e.g., 'my.domain.com' or 'localhost')
const hostnameRegex = new RegExp(`^${domainSegment}(?:\\.${domainSegment})*$`);

// Pattern for a TLD (used in requireTLD option)
const tldRegex = new RegExp(`\\.${tldAscii}$`);
const tldInternationalRegex = new RegExp(`\\.${tldInternational}$`, 'u');

/**
 * Validates if the string is a valid email address.
 * @param {string} str - String to validate.
 * @param {object} [options={}] - Validation options.
 * @param {boolean} [options.allowDisplayName=true] - If true, allows the format "Display Name <email@example.com>".
 * @param {boolean} [options.requireDisplayName=false] - If true, requires the display name format.
 * @param {boolean} [options.allowUTF8LocalPart=true] - If true, allows UTF-8 characters in the local part (before @).
 * @param {boolean} [options.requireTLD=true] - If true, requires the domain to have a TLD (e.g., .com, .org).
 * @param {boolean} [options.allowIPDomain=false] - If true, allows an IP address as the domain (e.g., email@[127.0.0.1]).
 * @param {boolean} [options.ignoreMaxLength=false] - If true, ignores the 254 character limit for emails.
 * @param {string[]} [options.hostBlacklist=[]] - A list of domains (hosts) to be rejected.
 * @param {string[]} [options.hostWhitelist=[]] - If set, only domains (hosts) in this list will be allowed.
 * @returns {ValidationResult} Validation result object.
 */
export function validateEmail(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }

  const defaults = {
    allowDisplayName: true,
    requireDisplayName: false,
    allowUTF8LocalPart: true,
    requireTLD: true,
    allowIPDomain: false,
    ignoreMaxLength: false,
    hostBlacklist: [],
    hostWhitelist: [],
  };
  const opt = { ...defaults, ...options };

  let testStr = toString(str).trim();

  if (!opt.ignoreMaxLength && testStr.length > 254) {
    return { valid: false, error: 'validateEmailMaxLength' };
  }

  const match = testStr.match(displayNameRegex);
  if (match) {
    if (!opt.allowDisplayName) {
      return { valid: false, error: 'validateEmailDisplayNameNotAllowed' };
    }
    testStr = match[1];
  } else if (opt.requireDisplayName) {
    return { valid: false, error: 'validateEmailDisplayNameRequired' };
  }

  const parts = testStr.split('@');
  if (parts.length !== 2) {
    return { valid: false, error: 'validateEmailFormat' };
  }
  const [localPart, domainPart] = parts;

  if (localPart === '') {
    return { valid: false, error: 'validateEmailLocalPart' };
  }
  const localRegex = opt.allowUTF8LocalPart ? utf8LocalPartRegex : asciiLocalPartRegex;
  if (!localRegex.test(localPart)) {
    return { valid: false, error: 'validateEmailLocalPart' };
  }

  const isIPDomain = domainPart.startsWith('[') && domainPart.endsWith(']');

  if (isIPDomain) {
    if (!opt.allowIPDomain) {
      return { valid: false, error: 'validateEmailDomainIPNotAllowed' };
    }

    const ip = domainPart.slice(1, -1);

    const ipToValidate = ip.startsWith('IPv6:') ? ip.slice(5) : ip;

    const ipResult = validateIP(ipToValidate);
    if (!ipResult.valid) {
      return { valid: false, error: 'validateEmailDomainPart' };
    }
  } else {
    if (!hostnameRegex.test(domainPart)) {
      return { valid: false, error: 'validateEmailDomainPart' };
    }

    if (opt.requireTLD) {
      const tldCheck = opt.allowUTF8LocalPart ? tldInternationalRegex : tldRegex;
      if (!tldCheck.test(domainPart)) {
        return { valid: false, error: 'validateEmailTLDRequired' };
      }
    }
  }

  const lowerDomain = domainPart.toLowerCase();
  if (opt.hostBlacklist.length > 0) {
    for (const host of opt.hostBlacklist) {
      if (lowerDomain.endsWith(host.toLowerCase())) {
        return { valid: false, error: 'validateEmailHostBlacklisted', context: { host } };
      }
    }
  }
  if (opt.hostWhitelist.length > 0) {
    let inWhitelist = false;
    for (const host of opt.hostWhitelist) {
      if (lowerDomain.endsWith(host.toLowerCase())) {
        inWhitelist = true;
        break;
      }
    }
    if (!inWhitelist) {
      return { valid: false, error: 'validateEmailHostWhitelist' };
    }
  }

  return { valid: true };
}
