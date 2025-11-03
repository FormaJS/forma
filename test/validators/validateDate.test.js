import { describe, it, expect } from 'vitest';
import { validateDate } from '../../src/validators/validateDate/index.js';
import '../setup.js';

describe('validateDate', () => {
    it('rejects non-string non-number types', () => {
        expect(validateDate({})).toEqual({ valid: false, error: 'invalidType' });
    });

    it('rejects invalid date strings', () => {
        const r = validateDate('not-a-date');
        expect(r.valid).toBe(false);
        expect(r.error).toBe('validateDate');
    });

    it('accepts ISO dates and respects min/max date bounds', () => {
        expect(validateDate('2020-01-02')).toEqual({ valid: true });

        const r1 = validateDate('2020-01-01', { minDate: '2020-01-02' });
        expect(r1.valid).toBe(false);
        expect(r1.error).toBe('validateDateMin');

        const r2 = validateDate('2020-01-03', { maxDate: '2020-01-02' });
        expect(r2.valid).toBe(false);
        expect(r2.error).toBe('validateDateMax');
    });
});
