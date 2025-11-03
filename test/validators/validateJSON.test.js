import { describe, it, expect } from 'vitest';
import { validateJSON } from '../../src/validators/validateJSON/index.js';
import '../setup.js';

describe('validateJSON', () => {
    it('rejects non-string and empty values', () => {
        expect(validateJSON(123)).toEqual({ valid: false, error: 'invalidType' });
        expect(validateJSON('   ')).toEqual({ valid: false, error: 'isEmpty' });
    });

    it('rejects malformed JSON', () => {
        expect(validateJSON('{invalid:}')).toEqual({ valid: false, error: 'validateJSON' });
    });

    it('accepts JSON primitives when allowPrimitives=true and objects when false', () => {
        expect(validateJSON('"string"')).toEqual({ valid: true });
        expect(validateJSON('123')).toEqual({ valid: true });
        // When primitives not allowed
        expect(validateJSON('"string"', { allowPrimitives: false })).toEqual({
            valid: false,
            error: 'validateJSONNotObject',
        });
        expect(validateJSON('{"a":1}', { allowPrimitives: false })).toEqual({ valid: true });
    });
});
