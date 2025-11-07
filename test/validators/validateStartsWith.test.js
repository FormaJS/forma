import { describe, it, expect } from 'vitest';
import { validateStartsWith } from '../../src/validators/validateStartsWith/index.js';
import '../setup.js';

describe('validateStartsWith', () => {
  it('validates strict (case-sensitive) startsWith by default', () => {
    expect(validateStartsWith('Hello', 'He')).toEqual({ valid: true });
    const r = validateStartsWith('hello', 'H');
    expect(r.valid).toBe(false);
    expect(r.error).toBe('validateStartsWith');
  });

  it('works with strict=false (case-insensitive) and ignoreWhitespace', () => {
    const r1 = validateStartsWith('hello', 'H', { strict: false });
    expect(r1).toEqual({ valid: true });

    const r2 = validateStartsWith('   abc', 'a', { ignoreWhitespace: true });
    expect(r2).toEqual({ valid: true });
  });

  it('rejects missing seed', () => {
    const r = validateStartsWith('abc', undefined);
    expect(r.valid).toBe(false);
    expect(r.error).toBe('invalidRule');
  });
});
