import { describe, it, expect } from 'vitest';
import { validateSlug } from '../../src/validators/validateSlug/index.js';
import '../setup.js';

describe('validateSlug', () => {
    it('accepts default dash-separated lowercase slugs', () => {
        expect(validateSlug('abc-def')).toEqual({ valid: true });
        expect(validateSlug('abc')).toEqual({ valid: true });
    });

    it('rejects uppercase when requireLowercase=true and accepts when false', () => {
        const r1 = validateSlug('Abc-def');
        expect(r1.valid).toBe(false);

        const r2 = validateSlug('Abc-def', { requireLowercase: false });
        expect(r2).toEqual({ valid: true });
    });

    it('supports custom separator and empty-string handling', () => {
        const r1 = validateSlug('abc_def', { separator: '_' });
        expect(r1).toEqual({ valid: true });

        const r2 = validateSlug('   ');
        expect(r2).toEqual({ valid: false, error: 'isEmpty' });
    });
});
