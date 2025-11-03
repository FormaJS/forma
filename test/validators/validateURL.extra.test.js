import { describe, it, expect } from 'vitest';
import { validateURL } from '../../src/validators/validateURL/index.js';
import '../setup.js';

describe('validateURL extended', () => {
    it('basic type and empty checks', () => {
        expect(validateURL(123)).toEqual({ valid: false, error: 'invalidType' });
        expect(validateURL('')).toEqual({ valid: false, error: 'isEmpty' });
    });

    it('protocol handling', () => {
        expect(validateURL('example.com', { requireProtocol: true })).toEqual({
            valid: false,
            error: 'validateURLProtocolRequired',
        });
        // without requireProtocol it should be accepted (http prefixed)
        expect(validateURL('example.com')).toEqual({ valid: true });
        // unsupported protocol (note: mailto without '://' is treated as auth and will fail auth check)
        expect(validateURL('mailto:foo@bar.com')).toEqual({
            valid: false,
            error: 'validateURLAuthNotAllowed',
        });
    });

    it('localhost and IP handling', () => {
        expect(validateURL('http://localhost')).toEqual({ valid: true });
        const res = validateURL('http://127.0.0.1', { allowIPDomain: false });
        expect(res.valid).toBe(false);
        expect(res.error).toBe('validateURLIPNotAllowed');
    });
});
