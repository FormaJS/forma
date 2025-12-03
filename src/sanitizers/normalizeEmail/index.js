import { toString } from '../../utils/index.js';
import {
  domainsWithSubaddressing,
  domainsWithDots,
  domainAliases,
  displayNameRegex,
} from '../../utils/index.js';

/**
 * Normalize an email address into a canonical form.
 * @param {string} str - The email string to normalize.
 * @param {object} [options={}] - Sanitization options.
 * @param {boolean} [options.lowercase=true] - Convert the whole email to lowercase.
 * @param {boolean} [options.normalizeDots=true] - Remove dots for providers that ignore them (e.g., 'g.mail').
 * @param {boolean} [options.normalizeSubaddressing=true] - Remove subaddressing tags (e.g., '+alias').
 * @param {boolean} [options.allowDisplayName=true] - Extract the email from a display name format like "Name <email>".
 * @returns {string} The transformed (normalized) email string.
 */
export function normalizeEmail(str, options = {}) {
  let s = toString(str).trim();

  const doLowercase = options.lowercase !== false;
  const doNormalizeDots = options.normalizeDots !== false;
  const doNormalizeSubaddressing = options.normalizeSubaddressing !== false;
  const doAllowDisplayName = options.allowDisplayName !== false;

  if (doAllowDisplayName) {
    const match = s.match(displayNameRegex);
    if (match) {
      s = match[1];
    }
  }

  if (doLowercase) {
    s = s.toLowerCase();
  }

  const parts = s.split('@');
  if (parts.length !== 2) {
    return s;
  }

  let local = parts[0];
  let domain = parts[1];

  if (domainAliases[domain]) {
    domain = domainAliases[domain];
  }

  if (doNormalizeSubaddressing && domainsWithSubaddressing.has(domain)) {
    local = local.replace(/\+.*$/, '');
  }

  if (doNormalizeDots && domainsWithDots.has(domain)) {
    local = local.replace(/\./g, '');
  }

  return local + '@' + domain;
}
