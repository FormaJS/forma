import { describe, it, expect } from 'vitest';
import { validateIPRange } from '../../src/validators/validateIPRange/index.js';
import '../setup.js';

describe('validateIPRange', () => {
    it('accepts valid IPv4 CIDR', () => {
        expect(validateIPRange('192.168.0.0/24')).toEqual({ valid: true });
    });

    it('accepts valid IPv6 CIDR', () => {
        expect(validateIPRange('2001:db8::/32')).toEqual({ valid: true });
    });

    it('rejects missing slash or invalid mask', () => {
        const r1 = validateIPRange('192.168.0.0');
        expect(r1).toEqual({ valid: false, error: 'validateIPRange' });

        const r2 = validateIPRange('192.168.0.0/33');
        expect(r2.valid).toBe(false);
        expect(r2.error).toBe('validateIPRangeV4');
    });
});
