import { validateBIC } from '../../src/validators/validateBIC/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateBIC', () => {
    it('valida BIC correto', () => {
        expect(validateBIC('DEUTDEFF', { locale: 'en-US' })).toEqual({ valid: true });
        expect(validateBIC('ABCDPTPL', { locale: 'pt-BR' })).toEqual({ valid: true });
    });

    it('retorna erro para BIC inválido', () => {
        const result = validateBIC('INVALID', { locale: 'en-US' });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateBIC');
    });

    it('retorna erro se locale não informado', () => {
        const result = validateBIC('DEUTDEFF');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('localeRequired');
    });

    it('retorna erro para tipo inválido', () => {
        const result = validateBIC(123, { locale: 'en-US' });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidType');
    });
});
