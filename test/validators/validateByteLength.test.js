import { describe, it, expect } from 'vitest';
import { validateByteLength } from '../../src/validators/validateByteLength/index.js';
import '../setup.js';

describe('validateByteLength', () => {
  it('rejects non-string types', () => {
    expect(validateByteLength(123)).toEqual({ valid: false, error: 'invalidType' });
  });

  it('enforces min and max in bytes', () => {
    const r1 = validateByteLength('abc', { min: 5 });
    expect(r1.valid).toBe(false);
    expect(r1.error).toBe('validateByteLengthMin');
    expect(r1.context).toEqual({ min: 5 });

    const r2 = validateByteLength('abcdef', { max: 5 });
    expect(r2.valid).toBe(false);
    expect(r2.error).toBe('validateByteLengthMax');
    expect(r2.context).toEqual({ max: 5 });

    const r3 = validateByteLength('abc', { min: 1, max: 10 });
    expect(r3).toEqual({ valid: true });
  });
});
