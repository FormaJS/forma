import { Forma } from './core/forma.js';
export * from './sanitizers/index.js';
export * from './parsers/index.js';
export * from './validators/index.js';
export { locales } from './i18n/index.js';

/**
 * Export a pre-configured default instance for quick use.
 * Allows: import { forma } from 'formajs';
 * forma.isFloat('1,23');
 */
export const forma = new Forma('en-US');

// Default export is the instance for convenience (Option B)
export default forma;

/**
 * Named export of the class.
 * Allows: import { Forma } from 'formajs';
 */
export { Forma };

// Re-export i18n directly for tests/helpers
export * from './i18n/index.js';
