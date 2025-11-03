import { describe, it, expect } from 'vitest';
import { validateISO } from '../../src/validators/validateISO/index.js';
import '../setup.js';

describe('validateISO', () => {
    it('rejects non-string types', async () => {
        const res = await validateISO(12345);
        expect(res).toEqual({ valid: false, error: 'invalidType' });
    });

    it('rejects empty strings', async () => {
        const res = await validateISO('   ', { standard: '3166-1' });
        expect(res).toEqual({ valid: false, error: 'isEmpty' });
    });

    it('requires the standard option', async () => {
        const res = await validateISO('BR');
        expect(res).toEqual({ valid: false, error: 'validateISOStandardRequired' });
    });

    it('returns unknown-standard for unsupported standards', async () => {
        const res = await validateISO('X', { standard: 'FOO' });
        expect(res.valid).toBe(false);
        expect(res.error).toBe('validateISOUnknownStandard');
        expect(res.context).toEqual({ standard: 'FOO' });
    });

    it('validates ISO3166-1 alpha-2 and alpha-3 correctly', async () => {
        expect((await validateISO('BR', { standard: '3166-1', alpha: '2' })).valid).toBe(true);
        expect((await validateISO('BRA', { standard: '3166-1', alpha: '3' })).valid).toBe(true);
        // when alpha omitted, both are accepted
        expect((await validateISO('BR', { standard: '3166-1' })).valid).toBe(true);
        expect((await validateISO('BRA', { standard: '3166-1' })).valid).toBe(true);
    });

    it('validates ISO639-1 codes with case sensitivity option', async () => {
        // default is case-insensitive -> both should pass
        expect((await validateISO('pt', { standard: '639-1' })).valid).toBe(true);
        expect((await validateISO('PT', { standard: '639-1' })).valid).toBe(true);

        // with caseSensitive true, uppercase should fail for the a-z pattern
        const res = await validateISO('PT', { standard: '639-1', caseSensitive: true });
        expect(res.valid).toBe(false);
        expect(res.error).toBe('validateISO_ISO639-1');
    });

    it('validates ISO8601 in strict and lenient modes', async () => {
        // strict requires full timestamp with timezone
        const okStrict = await validateISO('2020-01-02T12:00:00Z', {
            standard: '8601',
            strict: true,
        });
        expect(okStrict.valid).toBe(true);

        const notStrict = await validateISO('2020-01-02', { standard: '8601', strict: true });
        expect(notStrict.valid).toBe(false);
        expect(notStrict.error).toBe('validateISO_8601_strict');

        // lenient accepts bare date
        const okLenient = await validateISO('2020-01-02', { standard: '8601', strict: false });
        expect(okLenient.valid).toBe(true);

        const bad = await validateISO('not-a-date', { standard: '8601' });
        expect(bad.valid).toBe(false);
        expect(bad.error).toBe('validateISO_8601_lenient');
    });
});
