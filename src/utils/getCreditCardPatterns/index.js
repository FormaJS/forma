import { getLocaleData, globalValidations } from '../../i18n/index.js';

/**
 * Retrieves and merges global and locale-specific credit card regex patterns.
 * @param {string} locale - The current locale (e.g., 'pt-BR').
 * @returns {object} An object where keys are issuer names and values are objects { pattern, flags }.
 */
export function getCreditCardPatterns(locale) {
    const localeData = getLocaleData(locale);
    const globalPatterns = globalValidations?.validate?.creditCardPatterns || {};
    const localePatterns = localeData?.validate?.creditCardPatterns || {};

    return { ...globalPatterns, ...localePatterns };
}
