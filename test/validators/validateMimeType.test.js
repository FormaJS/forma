import { validateMimeType } from '../../src/validators/validateMimeType/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateMimeType', () => {
    it('valida MIME type correto', () => {
        expect(validateMimeType('application/json')).toEqual({ valid: true });
        expect(validateMimeType('text/plain')).toEqual({ valid: true });
        expect(validateMimeType('image/png')).toEqual({ valid: true });
    });

    it('retorna erro para MIME type inválido', () => {
        const result = validateMimeType('invalid');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateMimeType');
    });

    it('retorna erro para tipo inválido', () => {
        const result = validateMimeType(123);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidType');
    });
});
