import { describe, it, expect } from 'vitest';
import { validateContains } from '../../src/validators/validateContains/index.js';
import '../setup.js';

describe('validateContains', () => {
    it('rejects non-string types and missing seed', () => {
        expect(validateContains(123, 'a')).toEqual({ valid: false, error: 'invalidType' });
        expect(validateContains('abc', null)).toEqual({
            valid: false,
            error: 'invalidRule',
            context: { rule: 'contains(seed)' },
        });
    });

    it('respects case sensitivity and ignoreWhitespace', () => {
        expect(validateContains('Hello World', 'world', { strict: false })).toEqual({
            valid: true,
        });
        expect(validateContains('a b c', 'abc', { ignoreWhitespace: true })).toEqual({
            valid: true,
        });
    });

    it('enforces min/max occurrences', () => {
        const r1 = validateContains('aaab', 'a', { minOccurrences: 4 });
        expect(r1.valid).toBe(false);
        expect(r1.error).toBe('validateContainsMin');

        const r2 = validateContains('aaaa', 'a', { maxOccurrences: 3 });
        expect(r2.valid).toBe(false);
        expect(r2.error).toBe('validateContainsMax');
    });
});
