import { describe, it, expect } from 'vitest';
import { validateStrongPassword } from '../../src/validators/validateStrongPassword/index.js';
import '../setup.js';

describe('validateStrongPassword', () => {
    it('rejects non-string types', () => {
        expect(validateStrongPassword(123)).toEqual({ valid: false, error: 'invalidType' });
    });

    it('fails when shorter than minLength', () => {
        const res = validateStrongPassword('Ab1!', { minLength: 6 });
        expect(res.valid).toBe(false);
        expect(res.error).toBe('validatePasswordMinLength');
        expect(res.context).toEqual({ minLength: 6 });
    });

    it('fails when longer than maxLength', () => {
        const res = validateStrongPassword('Abcdefgh1!', { maxLength: 5 });
        expect(res.valid).toBe(false);
        expect(res.error).toBe('validatePasswordMaxLength');
        expect(res.context).toEqual({ maxLength: 5 });
    });

    it('enforces lowercase/uppercase/numbers/symbols minimums', () => {
        // missing lowercase
        let res = validateStrongPassword('ABCDEF1!', { minLowercase: 1 });
        expect(res.valid).toBe(false);
        expect(res.error).toBe('validatePasswordLowercase');

        // missing uppercase
        res = validateStrongPassword('abcdef1!', { minUppercase: 1 });
        expect(res.valid).toBe(false);
        expect(res.error).toBe('validatePasswordUppercase');

        // missing numbers
        res = validateStrongPassword('Abcdefg!', { minNumbers: 1 });
        expect(res.valid).toBe(false);
        expect(res.error).toBe('validatePasswordNumbers');

        // missing symbols
        res = validateStrongPassword('Abcdefg1', { minSymbols: 1 });
        expect(res.valid).toBe(false);
        expect(res.error).toBe('validatePasswordSymbols');
    });

    it('accepts a password that meets all criteria', () => {
        const res = validateStrongPassword('Abcdef1!');
        expect(res.valid).toBe(true);
    });
});
