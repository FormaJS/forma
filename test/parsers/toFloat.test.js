import { describe, it, expect } from 'vitest';
import { toFloat } from '../../src/parsers/toFloat/index.js';
import '../setup.js';

describe('toFloat parser', () => {
    it('parses simple decimal strings', () => {
        expect(toFloat('123.45')).toBeCloseTo(123.45);
        expect(toFloat('0')).toBeCloseTo(0);
    });

    it('parses locale-aware numbers when locale provided', () => {
        // pt-BR uses dot as thousand separator and comma as decimal
        expect(toFloat('1.234,56', { locale: 'pt-BR' })).toBeCloseTo(1234.56);
    });

    it('returns null for non-strings or invalid numbers', () => {
        expect(toFloat(null)).toBeNull();
        expect(toFloat('not a number')).toBeNull();
    });
});
