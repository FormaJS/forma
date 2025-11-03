import { validateUUID } from '../../src/validators/validateUUID/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateUUID', () => {
    it('valida UUID v4 correto', () => {
        expect(validateUUID('550e8400-e29b-41d4-a716-446655440000')).toEqual({ valid: true });
        expect(validateUUID('550e8400-e29b-41d4-a716-446655440000', { version: 4 })).toEqual({
            valid: true,
        });
    });

    it('valida UUID v3 correto', () => {
        expect(validateUUID('6fa459ea-ee8a-3ca4-894e-db77e160355e', { version: 3 })).toEqual({
            valid: true,
        });
    });

    it('valida UUID v5 correto', () => {
        expect(validateUUID('886313e1-3b8a-5372-9b90-0c9aee199e5d', { version: 5 })).toEqual({
            valid: true,
        });
    });

    it('retorna erro para UUID inválido', () => {
        const result = validateUUID('invalid');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateUUID');
    });

    it('retorna erro para versão específica inválida', () => {
        const result = validateUUID('550e8400-e29b-41d4-a716-446655440000', { version: 3 });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateUUIDVersion');
    });

    it('retorna erro para versão não suportada', () => {
        const result = validateUUID('550e8400-e29b-41d4-a716-446655440000', { version: 6 });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidRule');
    });

    it('retorna erro para tipo inválido', () => {
        const result = validateUUID(123);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidType');
    });
});
