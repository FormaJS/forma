import { isString, toString } from '../../../utils/index.js';

// RegEx for formats (expects ###-##-#### or ##-#######)
const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
const einRegex = /^\d{2}-\d{7}$/;
const itinRegex = /^9\d{2}-\d{2}-\d{4}$/;

/**
 * Validates a SSN (Social Security Number).
 * Checks format and basic rules.
 * @param {string} ssn - The SSN to validate (format ###-##-####).
 * @returns {boolean} True if the SSN is valid.
 */
function _validateSSN(ssn) {
    if (!ssnRegex.test(ssn)) {
        return false;
    }
    // Additional basic SSN validation
    const area = ssn.slice(0, 3);
    const group = ssn.slice(4, 6);
    const serial = ssn.slice(7, 11);
    if (area === '000' || area === '666' || parseInt(area, 10) >= 900) {
        return false;
    }
    if (group === '00') {
        return false;
    }
    if (serial === '0000') {
        return false;
    }
    return true; // Passed basic rules
}

/**
 * Validates an EIN (Employer Identification Number).
 * Checks only the format ##-#######.
 * @param {string} ein - The EIN to validate.
 * @returns {boolean} True if the EIN format is valid.
 */
function _validateEIN(ein) {
    if (!einRegex.test(ein)) {
        return false;
    }
    // We could add EIN valid prefix validation here
    // But the list is extensive and changes, so we only validate the format.
    return true;
}

/**
 * Validates an ITIN (Individual Taxpayer Identification Number).
 * Checks format 9##-##-#### and the central group range.
 * @param {string} itin - The ITIN to validate.
 * @returns {boolean} True if the ITIN is valid.
 */
function _validateITIN(itin) {
    if (!itinRegex.test(itin)) {
        // Verifica formato e se começa com 9
        return false;
    }
    // Additional validation for ITIN central group
    const group = parseInt(itin.slice(4, 6), 10);
    if (
        (group >= 70 && group <= 88) ||
        (group >= 90 && group <= 92) ||
        (group >= 94 && group <= 99)
    ) {
        return true;
    }
    return false;
}

/**
 * Validates common US Tax ID formats (SSN, EIN, ITIN).
 * Cleans the string, checks length, and calls specific validators.
 * @param {string} tin - The Tax ID to validate (may contain formatting).
 * @returns {boolean} True if it is a valid SSN, EIN, or ITIN.
 */
function validateTaxId(tin) {
    if (!isString(tin)) {
        return false;
    }
    const testStr = toString(tin);

    // --- STEP 1: Try to validate the original format (if present) ---
    if (einRegex.test(testStr)) {
        return _validateEIN(testStr);
    }
    if (itinRegex.test(testStr)) {
        return _validateITIN(testStr);
    }
    if (ssnRegex.test(testStr)) {
        return _validateSSN(testStr);
    }

    // --- STEP 2: If no format, clean and test (original logic) ---
    const cleanTin = testStr.replace(/\D/g, '');

    // All valid formats (SSN, EIN, ITIN) have 9 digits
    if (cleanTin.length !== 9) {
        return false;
    }

    // Try to validate as ITIN first (since it starts with 9, which is also valid for SSN)
    const itinFormatted = `${cleanTin.slice(0, 3)}-${cleanTin.slice(3, 5)}-${cleanTin.slice(5, 9)}`;
    if (cleanTin.startsWith('9') && _validateITIN(itinFormatted)) {
        return true;
    }

    // If not a valid ITIN (or doesn't start with 9), try to validate as SSN
    const ssnFormatted = `${cleanTin.slice(0, 3)}-${cleanTin.slice(3, 5)}-${cleanTin.slice(5, 9)}`;
    if (_validateSSN(ssnFormatted)) {
        return true;
    }

    // If not SSN, try to validate as EIN
    const einFormatted = `${cleanTin.slice(0, 2)}-${cleanTin.slice(2, 9)}`;
    if (_validateEIN(einFormatted)) {
        return true;
    }

    // If it didn't match any format
    return false;
}

// Export only the main function
export { validateTaxId };
