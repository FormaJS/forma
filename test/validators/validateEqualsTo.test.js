import { describe, it, expect } from 'vitest';
import { validateEqualsTo } from '../../src/validators/validateEqualsTo/index.js';
import '../setup.js';

describe('validateEqualsTo', () => {
    it('rejects non-string types', () => {
        expect(validateEqualsTo(123, '123')).toEqual({ valid: false, error: 'invalidType' });
    });

    it('compares strictly by default and can be case-insensitive', () => {
        expect(validateEqualsTo('abc', 'abc')).toEqual({ valid: true });
        const r = validateEqualsTo('Abc', 'abc');
        expect(r.valid).toBe(false);

        const r2 = validateEqualsTo('Abc', 'abc', { strict: false });
        expect(r2).toEqual({ valid: true });
    });

    it('respects ignoreWhitespace', () => {
        const r = validateEqualsTo('  abc ', 'abc', { ignoreWhitespace: true });
        expect(r).toEqual({ valid: true });
    });
});
