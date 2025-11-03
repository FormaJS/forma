import { describe, it, expect } from 'vitest';
import { validateNotEmpty } from '../../src/validators/validateNotEmpty/index.js';
import '../setup.js';

describe('validateNotEmpty', () => {
    it('rejects empty strings and whitespace-only values', () => {
        expect(validateNotEmpty('')).toEqual({ valid: false, error: 'isEmpty' });
        expect(validateNotEmpty('   ')).toEqual({ valid: false, error: 'isEmpty' });
    });

    it('rejects null/undefined via toString handling', () => {
        // toString(null) -> '' so should be considered empty
        expect(validateNotEmpty(null)).toEqual({ valid: false, error: 'isEmpty' });
    });

    it('accepts non-empty values including numbers converted to string', () => {
        expect(validateNotEmpty('a')).toEqual({ valid: true });
        expect(validateNotEmpty(0)).toEqual({ valid: true });
    });
});
