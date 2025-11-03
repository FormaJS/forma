import { validateSemVer } from '../../src/validators/validateSemVer/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateSemVer', () => {
    it('valida Semantic Version correto', () => {
        expect(validateSemVer('1.0.0')).toEqual({ valid: true });
        expect(validateSemVer('v1.0.0')).toEqual({ valid: true });
        expect(validateSemVer('1.0.0-alpha')).toEqual({ valid: true });
        expect(validateSemVer('1.0.0-alpha.1')).toEqual({ valid: true });
        expect(validateSemVer('1.0.0-0.3.7')).toEqual({ valid: true });
        expect(validateSemVer('1.0.0+20130313144700')).toEqual({ valid: true });
    });

    it('retorna erro para Semantic Version inválido', () => {
        const result = validateSemVer('invalid');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateSemVer');
    });

    it('retorna erro para tipo inválido', () => {
        const result = validateSemVer(123);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidType');
    });
});
