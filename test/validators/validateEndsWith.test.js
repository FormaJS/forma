import { describe, it, expect } from 'vitest';
import { validateEndsWith } from '../../src/validators/validateEndsWith/index.js';
import '../setup.js';

describe('validateEndsWith', () => {
    it('validates strict (case-sensitive) endsWith by default', () => {
        expect(validateEndsWith('Hello', 'llo')).toEqual({ valid: true });
        const r = validateEndsWith('hello', 'L');
        expect(r.valid).toBe(false);
    });

    it('works with strict=false (case-insensitive) and ignoreWhitespace', () => {
        const r1 = validateEndsWith('hello', 'LO', { strict: false });
        expect(r1).toEqual({ valid: true });

        const r2 = validateEndsWith('abc   ', 'c', { ignoreWhitespace: true });
        expect(r2).toEqual({ valid: true });
    });

    it('rejects missing seed', () => {
        const r = validateEndsWith('abc', undefined);
        expect(r.valid).toBe(false);
        expect(r.error).toBe('invalidRule');
    });
});
