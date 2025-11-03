import { describe, it, expect } from 'vitest';
import { validateMACAddress } from '../../src/validators/validateMACAddress/index.js';
import '../setup.js';

describe('validateMACAddress', () => {
    it('rejects non-string and empty strings', async () => {
        expect(await validateMACAddress(123)).toEqual({ valid: false, error: 'invalidType' });
        expect(await validateMACAddress('   ', { locale: 'en-US' })).toEqual({
            valid: false,
            error: 'isEmpty',
        });
    });

    it('accepts colon, hyphen and dot formats when allowed', async () => {
        const a = await validateMACAddress('00:1A:2B:3C:4D:5E', { locale: 'en-US' });
        expect(a).toEqual({ valid: true });

        const b = await validateMACAddress('00-1A-2B-3C-4D-5E', { locale: 'en-US' });
        expect(b).toEqual({ valid: true });

        const c = await validateMACAddress('001A.2B3C.4D5E', { locale: 'en-US' });
        expect(c).toEqual({ valid: true });
    });

    it('respects disallowed formats via options', async () => {
        const r = await validateMACAddress('00:1A:2B:3C:4D:5E', {
            allowColons: false,
            locale: 'en-US',
        });
        expect(r.valid).toBe(false);
        expect(r.error).toBe('validateMACAddressFormat');
    });
});
