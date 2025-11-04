import { describe, it, expect } from 'vitest';
import { formatDate } from '../../../src/formatters/formatDate/index.js';

describe('formatDate', () => {
    it('should format date for pt-BR locale', () => {
        const date = new Date('2025-10-31T00:00:00Z');
        const result = formatDate(date, { locale: 'pt-BR' });
        expect(result).toBe('31/10/2025');
    });

    it('should format date for en-US locale', () => {
        const date = new Date('2025-10-31T00:00:00Z');
        const result = formatDate(date, { locale: 'en-US' });
        expect(result).toBe('10/31/2025');
    });

    it('should return null for invalid date', () => {
        const result = formatDate(new Date('invalid'), { locale: 'pt-BR' });
        expect(result).toBeNull();
    });

    it('should return null for missing locale', () => {
        const date = new Date('2025-10-31T00:00:00Z');
        const result = formatDate(date, {});
        expect(result).toBeNull();
    });
});
