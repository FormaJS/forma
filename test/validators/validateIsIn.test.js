import { describe, it, expect } from 'vitest';
import { validateIsIn } from '../../src/validators/validateIsIn/index.js';
import '../setup.js';

describe('validateIsIn', () => {
  it('rejects non-string types and invalid comparison array', () => {
    expect(validateIsIn(123, ['a'])).toEqual({ valid: false, error: 'invalidType' });
    expect(validateIsIn('a', 'not-an-array')).toEqual({
      valid: false,
      error: 'invalidRule',
      context: { rule: 'isIn(array)' },
    });
  });

  it('accepts exact matches and respects strict/ignoreWhitespace options', () => {
    expect(validateIsIn('Apple', ['Banana', 'Apple'])).toEqual({ valid: true });

    const r1 = validateIsIn(' apple ', ['apple'], { strict: false, ignoreWhitespace: true });
    expect(r1).toEqual({ valid: true });

    const r2 = validateIsIn('Apple', ['apple']);
    expect(r2.valid).toBe(false);
    expect(r2.error).toBe('validateIsIn');
  });
});
