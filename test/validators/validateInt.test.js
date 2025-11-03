import { describe, it, expect } from 'vitest';
import { validateInt } from '../../src/validators/validateInt/index.js';
import '../setup.js';

describe('validateInt', () => {
    it('rejects non-string types', () => {
        expect(validateInt(123)).toEqual({ valid: false, error: 'invalidType' });
    });

    it('rejects decimal strings (not integers)', () => {
        const r = validateInt('1.23');
        expect(r.valid).toBe(false);
        expect(r.error).toBe('validateNumericNotInt');
    });

    it('accepts integer strings and respects range', () => {
        expect(validateInt('10')).toEqual({ valid: true });
        const r = validateInt('5', { minRange: 10 });
        expect(r.valid).toBe(false);
    });
});
