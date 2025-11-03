import { describe, it, expect } from 'vitest';
import { validatePort } from '../../src/validators/validatePort/index.js';
import '../setup.js';

describe('validatePort', () => {
    it('rejects non-string types and invalid numbers', () => {
        expect(validatePort(123)).toEqual({ valid: false, error: 'invalidType' });
        const r = validatePort('not-a-number');
        expect(r.valid).toBe(false);
    });

    it('rejects out-of-range ports and maps error key', () => {
        const r1 = validatePort('-1');
        expect(r1.valid).toBe(false);
        expect(r1.error).toBe('validatePortRange');

        const r2 = validatePort('70000');
        expect(r2.valid).toBe(false);
        expect(r2.error).toBe('validatePortRange');
    });

    it('accepts valid ports', () => {
        expect(validatePort('0')).toEqual({ valid: true });
        expect(validatePort('80')).toEqual({ valid: true });
        expect(validatePort('65535')).toEqual({ valid: true });
    });
});
