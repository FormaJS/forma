import { toString, applyFormatMask } from '../../utils/index.js';
import { getLocaleData } from '../../i18n/index.js';

/**
 * Aplica máscara de número móvel sensível ao locale.
 * @param {string} str - Valor a formatar (ex.: "11987654321").
 * @param {import('../../types/index.js').FormatterOptions} [options] - Opções de formatação.
 * @returns {string} String formatada (ex.: "(11) 98765-4321") ou apenas dígitos se não aplicável.
 */
export function formatMobileNumber(str, options = {}) {
  const rawDigits = toString(str).replace(/\D/g, '');

  const lang = options.locale;
  const defaults = { format: 'local' };
  const opt = { ...defaults, ...options };

  if (!lang) {
    return rawDigits;
  }

  const localeData = getLocaleData(lang);
  /** @type {import('../../types/index.js').MaskObject} */
  const maskObject = /** @type {any} */ (localeData?.masks?.mobileNumber);

  if (!maskObject || typeof maskObject !== 'object') {
    return rawDigits;
  }

  let mask = maskObject[opt.format];

  if (!mask) {
    mask = maskObject['local'];
    if (!mask) return rawDigits;
  }

  // When formatting international numbers, some locales provide input with a
  // leading zero (national trunk prefix). Many international masks expect the
  // number without the leading zero, so strip it temporarily for matching.
  const digits = rawDigits;

  // Try several candidate digit strings and return the first fully-applied mask
  // (we consider the mask fully applied when the output length equals the
  // mask length, since every placeholder expands to a single char).
  const expectedDigits = (mask.match(/#/g) || []).length;

  let candidates = [digits];

  // If the mask expects one fewer/more digit than provided, try adding/removing a trunk '0'
  // but be conservative: only try stripping for international masks and only try
  // prefixing for local masks when the digit counts differ by exactly one.
  const maskIsInternational = typeof mask === 'string' && mask.trim().startsWith('+');

  if (maskIsInternational && digits.startsWith('0') && digits.length === expectedDigits + 1) {
    candidates.unshift(digits.slice(1)); // prefer stripped
  }

  if (!maskIsInternational && !digits.startsWith('0') && digits.length === expectedDigits - 1) {
    candidates.unshift('0' + digits); // prefer prefixed
  }

  for (const d of candidates) {
    const out = applyFormatMask(d, mask);
    if (out.length === mask.length) return out;
  }

  // Fallback: return the raw digits string if we couldn't apply the mask
  return rawDigits;
}
