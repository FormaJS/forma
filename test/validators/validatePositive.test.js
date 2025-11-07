import { describe, it, expect } from 'vitest';
import { validatePositive } from '../../src/validators/validatePositive/index.js';
import '../setup.js';

describe('validatePositive', () => {
  it('rejects non-string types', () => {
    expect(validatePositive(123)).toEqual({ valid: false, error: 'invalidType' });
  });

  it('rejects zero or negative values (strict > 0) and maps error', () => {
    const r0 = validatePositive('0');
    expect(r0.valid).toBe(false);
    expect(r0.error).toBe('validateNumericPositive');

    const rn = validatePositive('-1');
    expect(rn.valid).toBe(false);
    expect(rn.error).toBe('validateNumericPositive');
  });

  it('accepts positive numbers', () => {
    expect(validatePositive('0.1')).toEqual({ valid: true });
    expect(validatePositive('10')).toEqual({ valid: true });
  });
});
