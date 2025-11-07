import { isString, toString } from '../../utils/index.js';
import {
  localAscii,
  internationalChars,
  tldAscii,
  tldInternational,
} from '../../utils/regexConstants.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Verifica se uma string é um FQDN (Fully Qualified Domain Name)
 * @param {string} str
 * @param {object} [options]
 * @param {boolean} [options.requireTld=true] - Exige um TLD (ex: .com, .org).
 * @param {boolean} [options.allowUnderscores=false] - Permite underscores (tecnicamente inválido para hostnames).
 * @param {boolean} [options.allowTrailingDot=false] - Permite um ponto ao final (ex: example.com.).
 * @param {boolean} [options.allowInternational=false] - Permite caracteres internacionais (IDN).
 * @param {boolean} [options.allowWildcard=false] - Permite domínios wildcard (ex: *.example.com).
 * @param {boolean} [options.allowLocalhost=false] - Permite a string "localhost" como válida.
 * @returns {ValidationResult} Objeto de resultado da validação.
 */
export function validateFQDN(str, options = {}) {
  if (!isString(str)) {
    return { valid: false, error: 'invalidType' };
  }
  let testStr = toString(str).trim();

  const defaults = {
    requireTld: true,
    allowUnderscores: false,
    allowTrailingDot: false,
    allowInternational: false,
    allowWildcard: false,
    allowLocalhost: false,
  };
  const opt = { ...defaults, ...options };

  if (opt.allowLocalhost && testStr === 'localhost') {
    return { valid: true };
  }
  if (!opt.allowLocalhost && testStr === 'localhost') {
    return { valid: false, error: 'validateFQDNLocalhost' };
  }

  if (opt.allowTrailingDot && testStr.endsWith('.')) {
    testStr = testStr.slice(0, -1);
  } else if (testStr.endsWith('.')) {
    return { valid: false, error: 'validateFQDNTrailingDot' };
  }

  if (opt.allowWildcard && testStr.startsWith('*.')) {
    testStr = testStr.slice(2);
  } else if (testStr.includes('*')) {
    return { valid: false, error: 'validateFQDNWildcard' };
  }

  if (testStr.length > 255) {
    return { valid: false, error: 'validateFQDNLength' };
  }

  if (!opt.allowUnderscores && testStr.includes('_')) {
    return { valid: false, error: 'validateFQDNUnderscores' };
  }

  let charSet = localAscii;
  let tldSet = tldAscii;

  if (opt.allowInternational) {
    charSet += internationalChars;
    tldSet = tldInternational;
  }
  if (opt.allowUnderscores) {
    charSet += '_';
  }

  const charClass = '-' + charSet.replace('\\-', '');
  const labelStartEnd = `[${charClass.replace('-', '')}]`;
  const labelMiddle = `[${charClass}]{0,61}`;
  const label = `${labelStartEnd}(?:${labelMiddle}${labelStartEnd})?`;

  const tld = `(${tldSet})`;

  let fqdnPattern;
  if (opt.requireTld) {
    fqdnPattern = new RegExp(`^(${label}\\.)+${tld}$`, opt.allowInternational ? 'u' : '');
  } else {
    fqdnPattern = new RegExp(`^${label}(?:\\.${label})*$`, opt.allowInternational ? 'u' : '');
  }

  if (!fqdnPattern.test(testStr)) {
    const labels = testStr.split('.');
    for (const l of labels) {
      if (l.length > 63) {
        return { valid: false, error: 'validateFQDNLength' };
      }
    }
    return { valid: false, error: 'validateFQDNFormat' };
  }

  return { valid: true };
}
