import { describe, it, expect } from 'vitest';
import { validateLicensePlate } from '../../src/validators/validateLicensePlate/index.js';
import '../setup.js';

describe('validateLicensePlate', () => {
    it('rejects non-string types and empty strings', async () => {
        expect(await validateLicensePlate(123)).toEqual({ valid: false, error: 'invalidType' });
        expect(await validateLicensePlate('   ', { locale: 'en-US' })).toEqual({
            valid: false,
            error: 'isEmpty',
        });
    });

    it('requires locale option', async () => {
        const r = await validateLicensePlate('ABC-123');
        expect(r).toEqual({ valid: false, error: 'localeRequired' });
    });

    it('delegates to i18n executor when locale provided', async () => {
        const r = await validateLicensePlate('ABC-123', { locale: 'en-US' });
        // executor behavior varies by locale; ensure a well-formed result
        expect(typeof r).toBe('object');
        expect(r).toHaveProperty('valid');
    });
});
