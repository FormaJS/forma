import { isString, toString, luhnCheck } from '../../../utils/index.js';

/**
 * French VAT (TVA intracommunautaire): "FR" + 2-digit key + 9-digit SIREN.
 * Key rule per DGFiP: key === (12 + 3 * (SIREN % 97)) % 97.
 * SIREN must also be valid under the Luhn algorithm.
 * @param {string} s - Canonical format (e.g., "FR14XXXXXXXXX").
 * @returns {boolean} True if the VAT number is valid.
 */
function isValidFRVat(s) {
  if (!/^FR\d{11}$/.test(s)) return false;
  const keyStr = s.slice(2, 4);
  const sirenStr = s.slice(4);
  const sirenNum = Number(sirenStr);
  if (!Number.isFinite(sirenNum)) return false;
  if (!luhnCheck(sirenStr)) return false;
  const computed = (12 + 3 * (sirenNum % 97)) % 97;
  const compStr = String(computed).padStart(2, '0');
  return compStr === keyStr;
}

/**
 * Locale-aware French Tax ID validator.
 * Normalizes input by trimming, uppercasing, and removing spaces, dots and hyphens.
 * Supported forms:
 * - SIREN: 9 digits (Luhn)
 * - SIRET: 14 digits (Luhn)
 * - VAT: "FR" + 2-digit key + 9-digit SIREN, with key per (12 + 3*(SIREN % 97)) % 97
 * @param {unknown} input - Value to validate (stringable).
 * @returns {boolean} True if the input is a valid French tax identifier.
 * @example
 * validateTaxId('732829320')       // true (SIREN)
 * validateTaxId('73282932000074')  // true (SIRET)
 * validateTaxId('FR14732829320')   // true (TVA)
 */
function validateTaxId(input) {
  if (!isString(input)) return false;
  const s = toString(input)
    .trim()
    .toUpperCase()
    .replace(/[\s.-]/g, '');

  if (/^\d{9}$/.test(s)) return luhnCheck(s);

  if (/^\d{14}$/.test(s)) return luhnCheck(s);

  if (s.startsWith('FR')) return isValidFRVat(s);

  return false;
}

export { validateTaxId };
