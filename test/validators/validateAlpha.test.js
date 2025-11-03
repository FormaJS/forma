import { validateAlpha } from '../../src/validators/validateAlpha/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateAlpha', () => {
    it('valida string alfabética correta para locale', () => {
        expect(validateAlpha('abc', { locale: 'en-US' })).toEqual({ valid: true });
        expect(validateAlpha('áéíóú', { locale: 'pt-BR' })).toEqual({ valid: true });
    });

    it('retorna erro para string com números', () => {
        const result = validateAlpha('abc123', { locale: 'en-US' });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateAlpha');
    });

    it('retorna erro se locale não informado', () => {
        const result = validateAlpha('abc');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('localeRequired');
    });

    it('ignora espaços se ignoreSpace=true', () => {
        expect(validateAlpha('abc def', { locale: 'en-US', ignoreSpace: true })).toEqual({
            valid: true,
        });
    });

    it('ignora caracteres customizados', () => {
        expect(validateAlpha('abc-def', { locale: 'en-US', ignoredChars: '-' })).toEqual({
            valid: true,
        });
    });

    it('retorna erro para tipo inválido', () => {
        const result = validateAlpha(123, { locale: 'en-US' });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidType');
    });

    it('retorna erro para regra inválida', () => {
        // Locale inexistente
        const result = validateAlpha('abc', { locale: 'xx-XX' });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidRule');
    });
});
