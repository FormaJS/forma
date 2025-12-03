/**
 * ISO/IEC 7064 Mod 11,10 check digit calculator.
 * Given a numeric string (without its check digit), computes the check digit (0-9).
 * Used by identifiers such as German IdNr and USt-IdNr.
 *
 * Algorithm (iterative): starts from p = 10; for each digit d: s = (p + d) % 10 (if 0, set to 10),
 * then p = (2 * s) % 11. The check digit is (11 - p) % 10.
 *
 * @param {string} digits - Numeric string without the check digit.
 * @returns {number} The computed check digit (0-9). Returns NaN if input is not digits.
 * @example
 * iso7064Mod11_10CheckDigit('12345678') // => 5
 */
export function iso7064Mod11_10CheckDigit(digits) {
  if (typeof digits !== 'string' || !/^\d+$/.test(digits)) return NaN;
  let p = 10;
  for (let i = 0; i < digits.length; i++) {
    const d = digits.charCodeAt(i) - 48;
    let s = (p + d) % 10;
    if (s === 0) s = 10;
    p = (2 * s) % 11;
  }
  return (11 - p) % 10;
}
