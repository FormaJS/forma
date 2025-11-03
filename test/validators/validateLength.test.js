import { describe, it, expect } from 'vitest';
import { validateLength } from '../../src/validators/validateLength/index.js';
import '../setup.js';

describe('validateLength', () => {
    it('validates exact length when min===max', () => {
        expect(validateLength('abc', { min: 3, max: 3 })).toEqual({ valid: true });
        const r = validateLength('ab', { min: 3, max: 3 });
        expect(r.valid).toBe(false);
        expect(r.error).toBe('validateLengthExact');
    });

    it('enforces min and max separately', () => {
        const r1 = validateLength('ab', { min: 3 });
        expect(r1.valid).toBe(false);
        expect(r1.error).toBe('validateLengthMin');

        const r2 = validateLength('abcdef', { max: 3 });
        expect(r2.valid).toBe(false);
        expect(r2.error).toBe('validateLengthMax');
    });

    it('accepts within-range lengths', () => {
        expect(validateLength('abcd', { min: 2, max: 5 })).toEqual({ valid: true });
    });
});
