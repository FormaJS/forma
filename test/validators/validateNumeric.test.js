import { describe, it, expect } from 'vitest';
import { validateNumeric } from '../../src/validators/validateNumeric/index.js';
import '../setup.js';

describe('validateNumeric', () => {
    it('rejects non-string and empty values', () => {
        expect(validateNumeric(123)).toEqual({ valid: false, error: 'invalidType' });
        expect(validateNumeric('   ')).toEqual({ valid: false, error: 'isEmpty' });
    });

    it('detects integer-only when allowDecimal=false', () => {
        const r = validateNumeric('1.23', { allowDecimal: false });
        expect(r.valid).toBe(false);
        expect(r.error).toBe('validateNumericNotInt');
    });

    it('enforces strict minRange correctly', () => {
        const r = validateNumeric('1', { minRange: 1, strict: true });
        expect(r.valid).toBe(false);
        expect(r.error).toBe('validateNumericRangeMinStrict');
        expect(r.context).toEqual({ minRange: 1 });
    });
});
