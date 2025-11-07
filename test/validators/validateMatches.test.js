import { describe, it, expect } from 'vitest';
import { validateMatches } from '../../src/validators/validateMatches/index.js';
import '../setup.js';

describe('validateMatches', () => {
  it('rejects non-string inputs', () => {
    expect(validateMatches(123, /a/)).toEqual({ valid: false, error: 'invalidType' });
  });

  it('accepts RegExp and string patterns with flags', () => {
    expect(validateMatches('abc', /a/)).toEqual({ valid: true });
    expect(validateMatches('ABC', 'a', { flags: 'i' })).toEqual({ valid: true });
  });

  it('handles invalid pattern types and malformed regex', () => {
    const r = validateMatches('abc', 123);
    expect(r).toEqual({ valid: false, error: 'validateMatchesInvalid' });

    // malformed pattern should be caught
    const r2 = validateMatches('abc', '\\');
    expect(r2.valid).toBe(false);
    expect(r2.error).toBe('validateMatchesInvalid');
  });
});
