import { validateCreditCard } from '../../src/validators/validateCreditCard/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateCreditCard', () => {
    it('valida cartão de crédito correto', () => {
        expect(validateCreditCard('4111111111111111')).toEqual({ valid: true });
        expect(validateCreditCard('4111 1111 1111 1111')).toEqual({ valid: true });
        expect(validateCreditCard('4111-1111-1111-1111')).toEqual({ valid: true });
    });

    it('retorna erro para cartão com checksum inválido', () => {
        const result = validateCreditCard('4111111111111112');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateCreditCardChecksum');
    });

    it('retorna erro para cartão com comprimento inválido', () => {
        const result = validateCreditCard('411111111111');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateCreditCardLength');
    });

    it('retorna erro para tipo inválido', () => {
        const result = validateCreditCard(4111111111111111);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidType');
    });
});
