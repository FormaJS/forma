import { describe, it, expect } from 'vitest';
import { validateDecimal } from '../../src/validators/validateDecimal/index.js';
import '../setup.js';

describe('validateDecimal', () => {
  it('rejects non-string types', () => {
    expect(validateDecimal(123)).toEqual({ valid: false, error: 'invalidType' });
  });

  it('rejects integer-only strings and accepts decimals', () => {
    expect(validateDecimal('123')).toEqual({
      valid: false,
      error: 'validateNumericNotDecimal',
    });
    expect(validateDecimal('123.45')).toEqual({ valid: true });
  });

  it('respects min/max range options', () => {
    const r1 = validateDecimal('1.5', { minRange: 2 });
    expect(r1.valid).toBe(false);
    expect(r1.error).toMatch(/validateNumericRangeMin/);

    const r2 = validateDecimal('5.5', { maxRange: 5 });
    expect(r2.valid).toBe(false);
    expect(r2.error).toMatch(/validateNumericRangeMax/);
  });
});
