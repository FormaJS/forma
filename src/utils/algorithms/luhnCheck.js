/**
 * Apply the Luhn algorithm (modulus 10) to verify a checksum.
 * Commonly used to validate IMEIs, credit card numbers, and similar identifiers.
 * @param {string} numStr - String containing digits only.
 * @returns {boolean} True if the checksum is valid, false otherwise.
 * @throws {TypeError} If the input is not a string of digits.
 */
export function luhnCheck(numStr) {
  if (typeof numStr !== 'string' || !/^\d+$/.test(numStr)) {
    return false;
  }

  let sum = 0;
  let doubleUp = false;
  for (let i = numStr.length - 1; i >= 0; i--) {
    let digit = parseInt(numStr.charAt(i), 10);

    if (doubleUp) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    doubleUp = !doubleUp;
  }
  return sum % 10 === 0;
}
