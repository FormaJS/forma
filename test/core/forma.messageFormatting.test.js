import { describe, it, expect } from 'vitest';
import { Forma } from '../../src/core/forma.js';
import '../setup.js';

describe('Forma message formatting with context', () => {
    it('formats message with context from validator error', () => {
        const f = new Forma('en-US');
        // validateLength returns error validateLengthMin with context { min }
        const res = f.validateLength('ab', { min: 5 });
        expect(res.valid).toBe(false);
        // message should be the i18n string with {min} replaced
        expect(typeof res.message).toBe('string');
        expect(res.message).toContain('5');
        expect(res.error).toBe('validateLengthMin');
        expect(res.context).toEqual({ min: 5 });
    });
});
