import { describe, it, expect } from 'vitest';
import { validateURL } from '../../src/validators/validateURL/index.js';
import '../setup.js';

describe('validateURL', () => {
    it('rejects non-string and empty values', () => {
        expect(validateURL(123)).toEqual({ valid: false, error: 'invalidType' });
        expect(validateURL('   ')).toEqual({ valid: false, error: 'isEmpty' });
    });

    it('accepts http/https and enforces protocol when required', () => {
        expect(validateURL('https://example.com')).toEqual({ valid: true });
        const r = validateURL('example.com', { requireProtocol: true });
        expect(r.valid).toBe(false);
        expect(r.error).toBe('validateURLProtocolRequired');
    });

    it('validates IP hostnames and localhost options', () => {
        expect(validateURL('http://127.0.0.1')).toEqual({ valid: true });
        expect(validateURL('http://localhost', { allowLocalhost: true })).toEqual({ valid: true });
        const r = validateURL('http://localhost', { allowLocalhost: false });
        expect(r.valid).toBe(false);
    });
});
