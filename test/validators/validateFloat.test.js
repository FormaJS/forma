import { describe, it, expect } from 'vitest';
import { validateFloat } from '../../src/validators/validateFloat/index.js';
import '../setup.js';

describe('validateFloat', () => {
  it('rejects non-string and empty values', () => {
    expect(validateFloat(123)).toEqual({ valid: false, error: 'invalidType' });
    expect(validateFloat('   ')).toEqual({ valid: false, error: 'isEmpty' });
  });

  it('accepts integer and decimal formats', () => {
    expect(validateFloat('123')).toEqual({ valid: true });
    expect(validateFloat('123.45')).toEqual({ valid: true });
  });

  it('respects min/max range and decimals allowed', () => {
    const r = validateFloat('1.23', { minRange: 2 });
    expect(r.valid).toBe(false);
    expect(r.error).toBeDefined();
  });
});
