import { describe, it, expect } from 'vitest';
import { validateNegative } from '../../src/validators/validateNegative/index.js';
import '../setup.js';

describe('validateNegative', () => {
  it('accepts negative numbers and rejects zero/positive', () => {
    expect(validateNegative('-1')).toEqual({ valid: true });

    const r0 = validateNegative('0');
    expect(r0.valid).toBe(false);
    // validateNegative maps strict max-range error to validateNumericNegative
    expect(r0.error).toBe('validateNumericNegative');

    const r1 = validateNegative('abc');
    expect(r1.valid).toBe(false);
    expect(r1.error).toBe('validateNumericFormat');
  });
});
