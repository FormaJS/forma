import { describe, it, expect } from 'vitest';
import { validateEmail } from '../../src/validators/validateEmail/index.js';
import '../setup.js';

describe('validateEmail extended', () => {
  it('valid and invalid basic cases', () => {
    expect(validateEmail('a@b.com')).toEqual({ valid: true });
    expect(validateEmail(123)).toEqual({ valid: false, error: 'invalidType' });
    expect(validateEmail('@domain.com')).toEqual({
      valid: false,
      error: 'validateEmailLocalPart',
    });
  });

  it('display name handling', () => {
    expect(validateEmail('Name <a@b.com>')).toEqual({ valid: true });
    expect(validateEmail('Name <a@b.com>', { allowDisplayName: false })).toEqual({
      valid: false,
      error: 'validateEmailDisplayNameNotAllowed',
    });
  });

  it('IP domain handling and host blacklist/whitelist', () => {
    // By default IP domains are not allowed
    expect(validateEmail('a@[127.0.0.1]')).toEqual({
      valid: false,
      error: 'validateEmailDomainIPNotAllowed',
    });
    // Allow IP domains
    expect(validateEmail('a@[127.0.0.1]', { allowIPDomain: true })).toEqual({ valid: true });

    // Blacklist
    const black = { hostBlacklist: ['example.com'] };
    expect(validateEmail('x@test.example.com', black)).toEqual({
      valid: false,
      error: 'validateEmailHostBlacklisted',
      context: { host: 'example.com' },
    });

    // Whitelist (must be in whitelist)
    const wl = { hostWhitelist: ['allowed.com'] };
    expect(validateEmail('a@notallowed.net', wl)).toEqual({
      valid: false,
      error: 'validateEmailHostWhitelist',
    });
    expect(validateEmail('a@sub.allowed.com', wl)).toEqual({ valid: true });
  });
});
