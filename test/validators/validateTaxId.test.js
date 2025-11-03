import { validateTaxId } from '../../src/validators/validateTaxId/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateTaxId', () => {
    // --- Casos Gerais e de Falha ---
    describe('General and Edge Cases', () => {
        it('should return { valid: false, error: "invalidType" } for null', async () => {
            const result = await validateTaxId(null, { locale: 'pt-BR' });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('invalidType');
        });

        it('should return { valid: false, error: "invalidType" } for a number', async () => {
            const result = await validateTaxId(12345678900, { locale: 'pt-BR' });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('invalidType');
        });

        it('should return { valid: false, error: "isEmpty" } for an empty string', async () => {
            const result = await validateTaxId('', { locale: 'pt-BR' });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('isEmpty');
        });

        it('should return { valid: false, error: "isEmpty" } for a whitespace string', async () => {
            const result = await validateTaxId('   ', { locale: 'pt-BR' });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('isEmpty');
        });

        it('should return { valid: false, error: "localeRequired" } if locale is missing', async () => {
            const result = await validateTaxId('12345', {});
            expect(result.valid).toBe(false);
            expect(result.error).toBe('localeRequired');
        });

        it('should return { valid: false, error: "invalidRule" } for an unsupported locale', async () => {
            const result = await validateTaxId('12345', { locale: 'es-ES' });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('invalidRule');
        });
    });

    // --- Testes para pt-BR (CPF/CNPJ) ---
    describe('pt-BR Locale', () => {
        let locale = 'pt-BR';

        // (Valores de teste válidos)
        const validCPF = '01006735038';
        const validCPFFormatted = '111.444.777-35';
        const validCNPJ = '11444777000161';
        const validCNPJFormatted = '11.444.777/0001-61';

        it('should validate a valid CPF (digits only)', async () => {
            const result = await validateTaxId(validCPF, { locale });
            expect(result.valid).toBe(true);
        });

        it('should validate a valid CPF (formatted)', async () => {
            const result = await validateTaxId(validCPFFormatted, { locale });
            expect(result.valid).toBe(true);
        });

        it('should validate a valid CNPJ (digits only)', async () => {
            const result = await validateTaxId(validCNPJ, { locale });
            expect(result.valid).toBe(true);
        });

        it('should validate a valid CNPJ (formatted)', async () => {
            const result = await validateTaxId(validCNPJFormatted, { locale });
            expect(result.valid).toBe(true);
        });

        it('should fail an invalid CPF (wrong digits)', async () => {
            const result = await validateTaxId('11144477730', { locale });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('validateTaxId');
        });

        it('should fail a CPF with all same digits', async () => {
            const result = await validateTaxId('11111111111', { locale });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('validateTaxId');
        });

        it('should fail an invalid CNPJ (wrong digits)', async () => {
            const result = await validateTaxId('11444777000160', { locale });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('validateTaxId');
        });

        it('should fail a CNPJ with all same digits', async () => {
            const result = await validateTaxId('11111111111111', { locale });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('validateTaxId');
        });

        it('should fail an invalid length (e.g., 12 digits)', async () => {
            const result = await validateTaxId('123456789012', { locale });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('validateTaxId');
        });
    });

    // --- Testes para en-US (SSN/EIN/ITIN) ---
    describe('en-US Locale', () => {
        let locale = 'en-US';

        it('should validate a valid SSN (formatted)', async () => {
            const result = await validateTaxId('123-45-6789', { locale });
            expect(result.valid).toBe(true);
        });

        it('should validate a valid SSN (digits only)', async () => {
            // Este SSN (123456789) é validado primeiro
            const result = await validateTaxId('123456789', { locale });
            expect(result.valid).toBe(true);
        });

        it('should validate a valid EIN (formatted)', async () => {
            const result = await validateTaxId('12-3456789', { locale });
            expect(result.valid).toBe(true);
        });

        it('should validate a valid EIN (digits only)', async () => {
            // Este número (001234567) falha na validação de SSN (área 001)
            // mas passa na validação de EIN
            const result = await validateTaxId('001234567', { locale });
            expect(result.valid).toBe(true);
        });

        it('should validate a valid ITIN (formatted)', async () => {
            const result = await validateTaxId('912-70-1234', { locale });
            expect(result.valid).toBe(true);
        });

        it('should validate a valid ITIN (digits only)', async () => {
            const result = await validateTaxId('912701234', { locale });
            expect(result.valid).toBe(true);
        });

        it('should fail an invalid SSN (area 000)', async () => {
            const result = await validateTaxId('000-12-3456', { locale });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('validateTaxId');
        });

        it('should fail an invalid SSN (area 666)', async () => {
            const result = await validateTaxId('666-12-3456', { locale });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('validateTaxId');
        });

        it('should fail an invalid SSN (group 00)', async () => {
            const result = await validateTaxId('123-00-4567', { locale });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('validateTaxId');
        });

        it('should fail an invalid ITIN (invalid group)', async () => {
            const result = await validateTaxId('912-60-1234', { locale });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('validateTaxId');
        });

        it('should fail if not ITIN, SSN, or EIN (e.g., starts with 9 but wrong group)', async () => {
            const result = await validateTaxId('912-12-1234', { locale });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('validateTaxId');
        });

        it('should fail an invalid length (e.g., 10 digits)', async () => {
            const result = await validateTaxId('1234567890', { locale });
            expect(result.valid).toBe(false);
            expect(result.error).toBe('validateTaxId');
        });
    });
});
