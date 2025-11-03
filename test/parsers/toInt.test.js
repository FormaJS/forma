import { describe, it, expect } from 'vitest';
import { toInt } from '../../src/parsers/toInt/index.js';
import '../setup.js';

describe('toInt parser', () => {
    it('parses integer strings and truncates decimals', () => {
        expect(toInt('42')).toBe(42);
        expect(toInt('123.99')).toBe(123);
    });

    it('parses locale-aware numbers when locale provided', () => {
        expect(toInt('1.234,56', { locale: 'pt-BR' })).toBe(1234);
    });

    it('returns null for non-strings or invalid numbers', () => {
        expect(toInt(undefined)).toBeNull();
        expect(toInt('abc')).toBeNull();
    });
});
