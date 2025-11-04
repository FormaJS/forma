import { describe, it, expect } from 'vitest';
import { formatCurrency } from '../../../src/formatters/formatCurrency/index.js';

describe('formatCurrency', () => {
    it('should format currency for pt-BR locale', () => {
        const result = formatCurrency(1234.56, { locale: 'pt-BR' });
        expect(result).toBe('R$ 1.234,56');
    });

    it('should format currency for en-US locale', () => {
        const result = formatCurrency(1234.56, { locale: 'en-US' });
        expect(result).toBe('$1,234.56');
    });

    it('should handle negative values', () => {
        const result = formatCurrency(-1234.56, { locale: 'pt-BR' });
        expect(result).toBe('- R$ 1.234,56');
    });

    it('should return null for invalid input', () => {
        const result = formatCurrency('invalid', { locale: 'pt-BR' });
        expect(result).toBeNull();
    });

    it('should return null for missing locale', () => {
        const result = formatCurrency(1234.56, {});
        expect(result).toBeNull();
    });
});
