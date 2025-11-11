import { getValidationRegex, isString, toString } from '../../utils/index.js';

/**
 * @typedef {object} ValidationResult
 * @property {boolean} valid - Whether the validation passed.
 * @property {string} [error] - The error code for the i18n message.
 * @property {object} [context] - Data to inject into the message.
 */

/**
 * Validates if the string is a valid UUID (Universally Unique Identifier).
 * @param {string} str - String to be validated
 * @param {object} [options={}] - Options
 * @param {string|number} [options.version] - Specific version to validate (3, 4, 5, 'ALL'). Default is 'ALL'.
 * @returns {ValidationResult} Validation result object
 */
export function validateUUID(str, options = {}) {
    if (!isString(str)) {
        return { valid: false, error: 'invalidType' };
    }

    const testStr = toString(str).trim();

    const lang = '';

    const version = options.version ? String(options.version).toUpperCase() : 'ALL';

    const supportedVersions = ['3', '4', '5', 'ALL'];
    if (!supportedVersions.includes(version)) {
        return { valid: false, error: 'invalidRule', context: { rule: `UUID-v${version}` } };
    }

    try {
        const regex = getValidationRegex(lang, 'isUUID', { subKey: version });

        if (!regex) {
            return { valid: false, error: 'invalidRule', context: { rule: `isUUID:${version}` } };
        }

        if (regex.test(testStr)) {
            return { valid: true };
        } else {
            if (version !== 'ALL') {
                return {
                    valid: false,
                    error: 'validateUUIDVersion',
                    context: { version },
                };
            }
            return { valid: false, error: 'validateUUID' };
        }
    } catch {
        return { valid: false, error: 'genericError' };
    }
}
