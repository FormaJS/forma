import { describe, it, expect } from 'vitest';
import { validateIsBlacklisted } from '../../src/validators/validateIsBlacklisted/index.js';
import '../setup.js';

describe('validateIsBlacklisted', () => {
  it('rejects non-string types', () => {
    expect(validateIsBlacklisted(123)).toEqual({ valid: false, error: 'invalidType' });
  });

  it('detects blacklisted characters and words (case-sensitive by default)', () => {
    const r1 = validateIsBlacklisted('hello$', { chars: '$' });
    expect(r1).toEqual({ valid: false, error: 'validateIsBlacklistedChars' });

    const r2 = validateIsBlacklisted('this is bad', { words: ['bad', 'evil'] });
    expect(r2.valid).toBe(false);
    expect(r2.error).toBe('validateIsBlacklistedWords');
    expect(r2.context).toHaveProperty('word');
  });

  it('is case-insensitive when strict=false', () => {
    const r = validateIsBlacklisted('NoGo', { words: ['nogo'], strict: false });
    expect(r.valid).toBe(false);
  });

  it('passes when none of the blacklisted items are present', () => {
    expect(validateIsBlacklisted('hello world', { chars: '!@', words: ['bad'] })).toEqual({
      valid: true,
    });
  });
});
