import { validateISINCode } from '../../src/validators/validateISINCode/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateISINCode', () => {
    it('valida ISIN correto', () => {
        expect(validateISINCode('US0378331005')).toEqual({ valid: true });
        expect(validateISINCode('US0378331005')).toEqual({ valid: true });
    });

    it('retorna erro para ISIN com formato inválido', () => {
        const result = validateISINCode('invalid');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateISINCodeFormat');
    });

    it('retorna erro para ISIN com checksum inválido', () => {
        const result = validateISINCode('US0378331004');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateISINCodeChecksum');
    });

    it('retorna erro para tipo inválido', () => {
        const result = validateISINCode(123);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidType');
    });
});
