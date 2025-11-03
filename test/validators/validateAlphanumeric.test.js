import { validateAlphanumeric } from '../../src/validators/validateAlphanumeric/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('isAlphanumeric', () => {
    it('valida string alfanumérica correta para locale', () => {
        expect(validateAlphanumeric('abc123', { locale: 'en-US' })).toEqual({ valid: true });
        expect(validateAlphanumeric('áéíóú123', { locale: 'pt-BR' })).toEqual({ valid: true });
    });

    it('retorna erro para string com caracteres especiais', () => {
        const result = validateAlphanumeric('abc@123', { locale: 'en-US' });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateAlphanumeric');
    });

    it('retorna erro se locale não informado', () => {
        const result = validateAlphanumeric('abc123');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('localeRequired');
    });

    it('ignora espaços se ignoreSpace=true', () => {
        expect(validateAlphanumeric('abc 123', { locale: 'en-US', ignoreSpace: true })).toEqual({
            valid: true,
        });
    });

    it('ignora caracteres customizados', () => {
        expect(validateAlphanumeric('abc-123', { locale: 'en-US', ignoredChars: '-' })).toEqual({
            valid: true,
        });
    });

    it('retorna erro para tipo inválido', () => {
        const result = validateAlphanumeric(123, { locale: 'en-US' });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidType');
    });

    it('retorna erro para regra inválida', () => {
        // Locale inexistente
        const result = validateAlphanumeric('abc123', { locale: 'xx-XX' });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidRule');
    });
});
