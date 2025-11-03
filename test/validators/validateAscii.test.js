import { validateAscii } from '../../src/validators/validateAscii/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateAscii', () => {
    it('valida string ASCII correta', () => {
        expect(validateAscii('abc123')).toEqual({ valid: true });
        expect(validateAscii('ABC!@#')).toEqual({ valid: true });
    });

    it('retorna erro para string com caracteres não ASCII', () => {
        const result = validateAscii('áéíóú');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateAscii');
    });

    it('retorna erro para tipo inválido', () => {
        const result = validateAscii(123);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidType');
    });
});
