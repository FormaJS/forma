import { validateIMEI } from '../../src/validators/validateIMEI/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateIMEI', () => {
    it('valida IMEI correto', () => {
        expect(validateIMEI('490154203237518')).toEqual({ valid: true });
        expect(validateIMEI('49-015420-323751-8')).toEqual({ valid: true });
        expect(validateIMEI('49 015420 323751 8')).toEqual({ valid: true });
    });

    it('retorna erro para IMEI com formato inválido', () => {
        const result = validateIMEI('invalid');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateIMEIFormat');
    });

    it('retorna erro para IMEI com checksum inválido', () => {
        const result = validateIMEI('490154203237517');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateIMEIChecksum');
    });

    it('retorna erro para tipo inválido', () => {
        const result = validateIMEI(123);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidType');
    });
});
