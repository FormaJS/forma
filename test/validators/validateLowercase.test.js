import { describe, it, expect } from 'vitest';
import { validateLowercase } from '../../src/validators/validateLowercase/index.js';
import '../setup.js';

describe('validateLowercase', () => {
  it('rejects non-string types', () => {
    expect(validateLowercase(123)).toEqual({ valid: false, error: 'invalidType' });
  });

  it('delegates to validateAlpha and requires locale', () => {
    const r = validateLowercase('abc');
    expect(r).toEqual({ valid: false, error: 'localeRequired' });
  });

  it('accepts lowercase and respects options', () => {
    expect(validateLowercase('abc', { locale: 'en-US' })).toEqual({ valid: true });
    const r = validateLowercase('aBc', { locale: 'en-US' });
    expect(r.valid).toBe(false);

    const r2 = validateLowercase('a b c', { ignoreSpace: true, locale: 'en-US' });
    expect(r2).toEqual({ valid: true });
  });
});
