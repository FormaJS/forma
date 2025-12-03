import { getLocaleData, globalValidations } from '../../i18n/index.js';

/**
 * Retrieves a validation regex from the i18n file.
 * @param {string} lang - Language (e.g., 'ptBR')
 * @param {string} key - Validation key in the i18n file (e.g., 'mobilenumber')
 * @param {object} [options={}] - Options that may contain sub-keys (e.g., { subKey: 'CA' })
 * @returns {RegExp} Compiled regex or null if not found
 */
export function getValidationRegex(lang, key, options = {}) {
  try {
    const i18n = getLocaleData(lang);

    let mask = i18n?.validate?.[key];

    if (!mask) {
      mask = globalValidations.validate?.[key];
    }

    if (!mask) return null;

    if (typeof mask === 'object' && mask.pattern) {
      return new RegExp(mask.pattern, mask.flags || '');
    }

    if (typeof mask === 'object' && !mask.pattern) {
      const subKey = options.state || options.subKey;
      if (!subKey) {
        return null;
      }

      const subMask = mask[subKey.toUpperCase()];
      if (subMask && subMask.pattern) {
        return new RegExp(subMask.pattern, subMask.flags || '');
      }
    }

    if (typeof mask === 'string') {
      if (mask.startsWith('/')) {
        const match = mask.match(/^\/(.*)\/(\w*)$/);
        if (match) return new RegExp(match[1], match[2]);
        return new RegExp(mask.slice(1, -1));
      }
      return new RegExp(mask);
    }

    return null;
  } catch {
    return null;
  }
}
