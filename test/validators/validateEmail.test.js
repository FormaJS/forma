import { describe, it, expect } from 'vitest';
import { validateEmail } from '../../src/validators/validateEmail/index.js';
import '../setup.js';

describe('validateEmail', () => {
  it('rejects non-string and empty values and wrong format', () => {
    expect(validateEmail(123)).toEqual({ valid: false, error: 'invalidType' });
    // validateEmail trims but does not specifically return isEmpty; it falls back to format error
    expect(validateEmail('   ')).toEqual({ valid: false, error: 'validateEmailFormat' });
    expect(validateEmail('no-at-symbol')).toEqual({
      valid: false,
      error: 'validateEmailFormat',
    });
  });

  it('accepts common emails and display names', () => {
    expect(validateEmail('user@example.com')).toEqual({ valid: true });
    expect(validateEmail('User Name <user@example.com>')).toEqual({ valid: true });
    // when display names not allowed
    expect(validateEmail('User Name <user@example.com>', { allowDisplayName: false })).toEqual({
      valid: false,
      error: 'validateEmailDisplayNameNotAllowed',
    });
  });

  it('enforces TLD requirement and host whitelist/blacklist', () => {
    const r = validateEmail('user@localhost', { requireTLD: true });
    expect(r.valid).toBe(false);

    const black = validateEmail('a@baddomain.com', { hostBlacklist: ['baddomain.com'] });
    expect(black.valid).toBe(false);
    expect(black.error).toBe('validateEmailHostBlacklisted');

    const white = validateEmail('a@good.com', { hostWhitelist: ['good.com'] });
    expect(white.valid).toBe(true);
    const notWhite = validateEmail('a@other.com', { hostWhitelist: ['good.com'] });
    expect(notWhite.valid).toBe(false);
    expect(notWhite.error).toBe('validateEmailHostWhitelist');
  });
});
