import { validateFQDN } from '../../src/validators/validateFQDN/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateFQDN', () => {
    it('valida FQDN correto', () => {
        expect(validateFQDN('example.com')).toEqual({ valid: true });
        expect(validateFQDN('sub.example.com')).toEqual({ valid: true });
        expect(validateFQDN('example.co.uk')).toEqual({ valid: true });
    });

    it('retorna erro para FQDN inválido', () => {
        const result = validateFQDN('invalid');
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateFQDNFormat');
    });

    it('permite localhost se allowLocalhost=true', () => {
        expect(validateFQDN('localhost', { allowLocalhost: true })).toEqual({ valid: true });
    });

    it('rejeita localhost se allowLocalhost=false', () => {
        const result = validateFQDN('localhost', { allowLocalhost: false });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateFQDNLocalhost');
    });

    it('permite ponto final se allowTrailingDot=true', () => {
        expect(validateFQDN('example.com.', { allowTrailingDot: true })).toEqual({ valid: true });
    });

    it('rejeita ponto final se allowTrailingDot=false', () => {
        const result = validateFQDN('example.com.', { allowTrailingDot: false });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateFQDNTrailingDot');
    });

    it('permite wildcard se allowWildcard=true', () => {
        expect(validateFQDN('*.example.com', { allowWildcard: true })).toEqual({ valid: true });
    });

    it('rejeita wildcard se allowWildcard=false', () => {
        const result = validateFQDN('*.example.com', { allowWildcard: false });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateFQDNWildcard');
    });

    it('permite underscores se allowUnderscores=true', () => {
        expect(validateFQDN('ex_ample.com', { allowUnderscores: true })).toEqual({ valid: true });
    });

    it('rejeita underscores se allowUnderscores=false', () => {
        const result = validateFQDN('ex_ample.com', { allowUnderscores: false });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateFQDNUnderscores');
    });

    it('rejeita se requireTld=true e não há TLD', () => {
        const result = validateFQDN('example', { requireTld: true });
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateFQDNFormat');
    });

    it('aceita sem TLD se requireTld=false', () => {
        expect(validateFQDN('example', { requireTld: false })).toEqual({ valid: true });
    });

    it('rejeita comprimento maior que 255', () => {
        const longDomain = 'a'.repeat(256) + '.com';
        const result = validateFQDN(longDomain);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateFQDNLength');
    });

    it('rejeita label maior que 63 caracteres', () => {
        const longLabel = 'a'.repeat(64) + '.com';
        const result = validateFQDN(longLabel);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('validateFQDNLength');
    });

    it('retorna erro para tipo inválido', () => {
        const result = validateFQDN(123);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('invalidType');
    });
});
