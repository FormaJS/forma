import { describe, it, expect } from 'vitest';
import { normalizeLocale } from '../../src/utils/normalizeLocale/index.js';
import '../setup.js';

describe('utils/normalizeLocale', () => {
    it('normalizes several locale input formats', () => {
        expect(normalizeLocale('pt-BR')).toBe('pt-BR');
        expect(normalizeLocale('pt_br')).toBe('pt-BR');
        expect(normalizeLocale('PTBR')).toBe('pt-BR');
        expect(normalizeLocale('en_us')).toBe('en-US');
        expect(normalizeLocale('invalid')).toBe('');
        expect(normalizeLocale(null)).toBe('');
    });
});
