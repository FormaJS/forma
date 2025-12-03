import {
  isString,
  toString,
  calculateMod11,
  getNormalizedNumberString,
} from '../../../utils/index.js';

/**
 * Validates a Brazilian CPF (Cadastro de Pessoa Física).
 * Rejects repeated digit sequences and applies check digit calculation.
 * @param {string} tid - CPF to validate.
 * @returns {boolean} True if the CPF is valid.
 */
function _validateCPF(tid) {
  if (!tid) return false;
  // Rejects repeated digit sequences
  if (/^(\d)\1{10}$/.test(tid)) return false;

  // Normalizes and left-pads to 11 digits
  tid = getNormalizedNumberString(tid, 'pt-BR').padStart(11, '0');

  // Applies check digit calculation (modulo 11)
  return calculateMod11(tid, 2, 2, 11);
}

/**
 * Validates a Brazilian CNPJ (Cadastro Nacional da Pessoa Jurídica).
 * Rejects repeated digit sequences and applies check digit calculation.
 * @param {string} tid - CNPJ to validate.
 * @returns {boolean} True if the CNPJ is valid.
 */
function _validateCNPJ(tid) {
  if (!tid) return false;
  // Rejects repeated digit sequences
  if (/^(\d)\1{13}$/.test(tid)) return false;

  // Normalizes and left-pads to 14 digits
  tid = getNormalizedNumberString(tid, 'pt-BR').padStart(14, '0');

  // Applies check digit calculation (modulo 11)
  return calculateMod11(tid, 2, 2, 9);
}

/**
 * Validates a Brazilian tax document number (CPF or CNPJ).
 * Removes non-numeric characters and calls the appropriate validator.
 * @param {string} tid - Tax document to validate.
 * @returns {boolean} True if it is a valid CPF or CNPJ.
 */
function validateTaxId(tid) {
  if (!isString(tid)) return false;

  // Removes non-numeric characters
  const normalizedTid = toString(tid).replace(/\D/g, '');

  // If too long for either, reject
  if (normalizedTid.length > 14) return false;

  // Try to validate as CPF
  // _validateCPF will left-pad with '0' if < 11 digits
  if (_validateCPF(normalizedTid)) {
    return true;
  }

  // Try to validate as CNPJ
  // _validateCNPJ will left-pad with '0' if < 14 digits
  if (_validateCNPJ(normalizedTid)) {
    return true;
  }

  // Failed both
  return false;
}

export { validateTaxId };
