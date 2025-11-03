import { describe, it, expect } from 'vitest';
import { validateDivisibleBy } from '../../src/validators/validateDivisibleBy/index.js';
import '../setup.js';

describe('validateDivisibleBy', () => {
    it('rejects non-string input', () => {
        expect(validateDivisibleBy(10, 2)).toEqual({ valid: false, error: 'invalidType' });
    });

    it('rejects invalid divisor (non-number or zero)', () => {
        expect(validateDivisibleBy('10', '2')).toEqual({
            valid: false,
            error: 'validateDivisibleByDivisor',
        });
        expect(validateDivisibleBy('10', 0)).toEqual({
            valid: false,
            error: 'validateDivisibleByDivisor',
        });
    });

    it('validates divisibility and returns context when not divisible', () => {
        expect(validateDivisibleBy('10', 2)).toEqual({ valid: true });
        const r = validateDivisibleBy('10', 3);
        expect(r.valid).toBe(false);
        expect(r.error).toBe('validateDivisibleBy');
        expect(r.context).toEqual({ divisor: 3 });
    });
});
