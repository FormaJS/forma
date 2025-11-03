import { validatePostalCode } from '../../src/validators/validatePostalCode/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validatePostalCode', () => {
    it('valida código postal correto', () => {
        expect(validatePostalCode('12345', { locale: 'en-US' })).toEqual({ valid: true });
        expect(validatePostalCode('12345-6789', { locale: 'en-US' })).toEqual({ valid: true });
        expect(validatePostalCode('09010-140', { locale: 'pt-BR' })).toEqual({ valid: true });
    });

    it('retorna erro para código postal inválido', () => {
        const result = validatePostalCode('invalid', { locale: 'en-US' });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validatePostalCode');
    });

    it('retorna erro se locale não informado', () => {
        const result = validatePostalCode('12345');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('localeRequired');
    });

    it('retorna erro para tipo inválido', () => {
        const result = validatePostalCode(123, { locale: 'en-US' });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidType');
    });

    it('retorna erro para regra inválida', () => {
        // Locale inexistente
        const result = validatePostalCode('12345', { locale: 'xx-XX' });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidRule');
    });
});
