import { isString, toString } from '../../../utils/index.js';

const TFN_WEIGHTS = [1, 4, 3, 7, 5, 8, 6, 9, 10];
const ABN_WEIGHTS = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

/**
 * Validates an Australian TFN (Tax File Number).
 *
 * Rules / behavior:
 * - Accepts a string that may contain formatting (spaces, dashes) and strips non-digits.
 * - TFN must be 9 digits long.
 * - Rejects sequences with all identical digits.
 * - Uses a weighted sum with `TFN_WEIGHTS` and checks sum % 11 === 0.
 *
 * @param {string} tfn - Tax File Number (may include separators).
 * @returns {boolean} True when `tfn` is a structurally valid TFN.
 * @example
 * _validateTFN('123 456 782') // true
 */
function _validateTFN(tfn) {
  if (!tfn) return false;
  const digits = tfn.replace(/\D/g, '');
  if (digits.length !== 9) return false;
  if (/^(\d)\1{8}$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i], 10) * TFN_WEIGHTS[i];
  }
  return sum % 11 === 0;
}

/**
 * Validates an Australian ABN (Australian Business Number).
 *
 * Rules / behavior:
 * - Accepts a string that may contain formatting (spaces, dashes) and strips non-digits.
 * - ABN must be 11 digits long.
 * - Rejects sequences with all identical digits.
 * - Algorithm: subtract 1 from the first digit, compute a weighted sum with `ABN_WEIGHTS`,
 *   and verify that (weightedSum % 89) === 0.
 *
 * @param {string} abn - Australian Business Number (may include separators).
 * @returns {boolean} True when `abn` is a structurally valid ABN.
 * @example
 * _validateABN('51 824 753 556') // true
 */
function _validateABN(abn) {
  if (!abn) return false;
  const digits = abn.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;
  const first = parseInt(digits[0], 10) - 1;
  if (first < 0) return false;
  let sum = first * ABN_WEIGHTS[0];
  for (let i = 1; i < 11; i++) {
    sum += parseInt(digits[i], 10) * ABN_WEIGHTS[i];
  }
  return sum % 89 === 0;
}

/**
 * Validates Australian Tax IDs (TFN or ABN).
 * Accepts common formatted or unformatted inputs and delegates to TFN/ABN checks.
 * @param {string} tin - Tax identifier (TFN or ABN).
 * @returns {boolean} True if the value is a valid TFN or ABN.
 * @example
 * validateTaxId('123456782')    // true (TFN, 9 digits)
 * validateTaxId('51824753556')  // true (ABN, 11 digits)
 */
function validateTaxId(tin) {
  if (!isString(tin)) return false;
  const testStr = toString(tin).trim();
  if (testStr === '') return false;

  if (_validateTFN(testStr)) return true;
  if (_validateABN(testStr)) return true;
  return false;
}

export { validateTaxId };
