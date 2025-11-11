import { describe, it, expect } from 'vitest';
import { registerLocale } from '../../src/i18n/index.js';
import { getValidationRegex } from '../../src/utils/getValidationRegex/index.js';

registerLocale('xx-XX', {
  validate: {
    directPattern: { pattern: '^abc$', flags: 'i' },
    statePattern: {
      CA: { pattern: '^ca-[0-9]{3}$' },
      NY: { pattern: '^ny-[0-9]{3}$', flags: 'i' },
    },
    slashWithFlags: '/^foo.+bar$/i',
    slashNoFlags: '/^noFlags[0-9]+$/',
    plainString: '^plain[A-Z]{2}$',
  },
});

describe('getValidationRegex utility', () => {
  it('returns regex from direct object pattern with flags', () => {
    const re = getValidationRegex('xx-XX', 'directPattern');
    expect(re).toBeInstanceOf(RegExp);
    expect(re.flags).toContain('i');
    expect('ABC').toMatch(re);
  });

  it('returns null when subKey required but not provided', () => {
    const re = getValidationRegex('xx-XX', 'statePattern');
    expect(re).toBeNull();
  });

  it('returns regex for provided subKey via options.state', () => {
    const re = getValidationRegex('xx-XX', 'statePattern', { state: 'ca' });
    expect(re).toBeInstanceOf(RegExp);
    expect('ca-123').toMatch(re);
    expect('ny-123').not.toMatch(re);
  });

  it('returns regex for provided subKey via options.subKey (case-insensitive key lookup)', () => {
    const re = getValidationRegex('xx-XX', 'statePattern', { subKey: 'ny' });
    expect(re).toBeInstanceOf(RegExp);
    expect('NY-999').toMatch(re);
  });

  it('parses string regex with flags (/pattern/flags)', () => {
    const re = getValidationRegex('xx-XX', 'slashWithFlags');
    expect(re).toBeInstanceOf(RegExp);
    expect(re.flags).toBe('i');
    expect('FOO something BAR').toMatch(re);
  });

  it('parses string regex wrapped in slashes without flags (/pattern/)', () => {
    const re = getValidationRegex('xx-XX', 'slashNoFlags');
    expect(re).toBeInstanceOf(RegExp);
    expect(re.flags).toBe('');
    expect('noFlags123').toMatch(re);
  });

  it('builds regex from plain string pattern (no leading slash)', () => {
    const re = getValidationRegex('xx-XX', 'plainString');
    expect(re).toBeInstanceOf(RegExp);
    expect('plainAB').toMatch(re);
    expect('plainAb').not.toMatch(re);
  });

  it('returns null for unknown key (locale + global fallback miss)', () => {
    const re = getValidationRegex('xx-XX', 'doesNotExist');
    expect(re).toBeNull();
  });
});
