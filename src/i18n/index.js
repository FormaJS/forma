import enUS from './lang/en-US.json';

import globalValidations from './lang/global.json';

// Registry to store loaded locales
const localeRegistry = new Map();

// Preload en-US by default
localeRegistry.set('en-US', enUS);

export const locales = {
  'en-US': enUS,
};

export const localeModules = {
  enUS: enUS,
};

export { globalValidations };

/**
 * Register a locale in the registry
 * @param {string} locale - The locale identifier (e.g., 'pt-BR')
 * @param {object} data - The locale data object
 */
export function registerLocale(locale, data) {
  localeRegistry.set(locale, data);
  locales[locale] = data;
  // Also add to localeModules with camelCase key
  const camelKey = locale.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  localeModules[camelKey] = data;
}

/**
 * Get locale data from registry
 * @param {string} locale - The locale identifier
 * @returns {object|null} The locale data or null if not found
 */
export function getLocaleData(locale) {
  return localeRegistry.get(locale) || null;
}

/**
 * Check if a locale is registered
 * @param {string} locale - The locale identifier
 * @returns {boolean} True if locale is registered
 */
export function hasLocale(locale) {
  return localeRegistry.has(locale);
}

/**
 * Get all registered locales
 * @returns {string[]} Array of registered locale identifiers
 */
export function getRegisteredLocales() {
  return Array.from(localeRegistry.keys());
}
