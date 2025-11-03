import { describe, it, expect } from 'vitest';
import { validateBoolean } from '../../src/validators/validateBoolean/index.js';
import '../setup.js';

describe('validateBoolean', () => {
    it('requires locale option', () => {
        expect(validateBoolean('true')).toEqual({ valid: false, error: 'localeRequired' });
    });

    it('accepts strict true/false and loose values when strict=false', () => {
        expect(validateBoolean('true', { locale: 'en-US' })).toEqual({ valid: true });
        expect(validateBoolean('yes', { locale: 'en-US' })).toEqual({ valid: true });
        const r = validateBoolean('maybe', { locale: 'en-US' });
        expect(r.valid).toBe(false);
        expect(r.error).toBe('validateBoolean');
    });
});
