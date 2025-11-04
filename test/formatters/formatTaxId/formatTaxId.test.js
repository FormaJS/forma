import { describe, it, expect } from 'vitest';
import { formatTaxId } from '../../../src/formatters/formatTaxId/index.js';

describe('formatTaxId', () => {
    it('should format CPF for pt-BR locale', () => {
        const result = formatTaxId('12345678901', { locale: 'pt-BR', type: 'CPF' });
        expect(result).toBe('123.456.789-01');
    });

    it('should format CNPJ for pt-BR locale', () => {
        const result = formatTaxId('12345678000123', { locale: 'pt-BR', type: 'CNPJ' });
        expect(result).toBe('12.345.678/0001-23');
    });

    it('should format SSN for en-US locale', () => {
        const result = formatTaxId('123456789', { locale: 'en-US', type: 'SSN' });
        expect(result).toBe('123-45-6789');
    });

    it('should return digits if locale is missing', () => {
        const result = formatTaxId('12345678901', { type: 'CPF' });
        expect(result).toBe('12345678901');
    });

    it('should return digits if type is missing', () => {
        const result = formatTaxId('12345678901', { locale: 'pt-BR' });
        expect(result).toBe('12345678901');
    });

    it('should return digits if mask is not found', () => {
        const result = formatTaxId('12345678901', { locale: 'pt-BR', type: 'INVALID' });
        expect(result).toBe('12345678901');
    });
});
