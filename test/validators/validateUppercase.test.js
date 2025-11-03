import { describe, it, expect } from 'vitest';
import { validateUppercase } from '../../src/validators/validateUppercase/index.js';
import '../setup.js';

describe('validateUppercase', () => {
    it('rejects non-string types', () => {
        expect(validateUppercase(123)).toEqual({ valid: false, error: 'invalidType' });
    });

    it('accepts fully uppercase strings and rejects mixed-case', () => {
        expect(validateUppercase('ABC', { locale: 'en-US' })).toEqual({ valid: true });
        const r = validateUppercase('AbC', { locale: 'en-US' });
        expect(r.valid).toBe(false);
        expect(r.error).toBe('validateUppercase');
    });

    it('respects ignoreSpace and ignoredChars options', () => {
        const r1 = validateUppercase('A B C', { ignoreSpace: true, locale: 'en-US' });
        expect(r1).toEqual({ valid: true });

        const r2 = validateUppercase('A-C', { ignoredChars: '-', locale: 'en-US' });
        expect(r2).toEqual({ valid: true });
    });
});
