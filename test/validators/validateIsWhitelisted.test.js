import { describe, it, expect } from 'vitest';
import { validateIsWhitelisted } from '../../src/validators/validateIsWhitelisted/index.js';
import '../setup.js';

describe('validateIsWhitelisted', () => {
  it('rejects non-string types', () => {
    expect(validateIsWhitelisted(123, { chars: 'abc' })).toEqual({
      valid: false,
      error: 'invalidType',
    });
  });

  it('rejects when chars option is missing or empty', () => {
    expect(validateIsWhitelisted('abc')).toEqual({
      valid: false,
      error: 'invalidRule',
      context: { rule: 'isWhitelisted(chars)' },
    });
    expect(validateIsWhitelisted('abc', { chars: '' })).toEqual({
      valid: false,
      error: 'invalidRule',
      context: { rule: 'isWhitelisted(chars)' },
    });
  });

  it('validates allowed characters and respects case sensitivity', () => {
    // only a,b,c allowed
    expect(validateIsWhitelisted('abc', { chars: 'abc' })).toEqual({ valid: true });
    // contains disallowed char 'd'
    const res = validateIsWhitelisted('abd', { chars: 'abc' });
    expect(res.valid).toBe(false);
    expect(res.error).toBe('validateIsWhitelisted');
    expect(res.context && typeof res.context.char).toBe('string');

    // case-insensitive when strict=false
    expect(validateIsWhitelisted('AbC', { chars: 'abc', strict: false })).toEqual({
      valid: true,
    });
    // case-sensitive (default) - 'A' is not allowed
    const r2 = validateIsWhitelisted('Ab', { chars: 'ab' });
    expect(r2.valid).toBe(false);
  });
});
