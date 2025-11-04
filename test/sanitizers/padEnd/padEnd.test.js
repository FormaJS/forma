import { describe, it, expect } from 'vitest';
import { padEnd } from '../../../src/sanitizers/padEnd/index.js';

describe('padEnd', () => {
    it('should pad the string to the specified length with default space', () => {
        const result = padEnd('hello', { length: 10 });
        expect(result).toBe('hello     ');
    });

    it('should pad the string with a custom character', () => {
        const result = padEnd('hello', { length: 10, char: '*' });
        expect(result).toBe('hello*****');
    });

    it('should return the original string if length is not provided', () => {
        const result = padEnd('hello', {});
        expect(result).toBe('hello');
    });

    it('should return the original string if length is null', () => {
        const result = padEnd('hello', { length: null });
        expect(result).toBe('hello');
    });

    it('should return the original string if it is already at or above the target length', () => {
        const result = padEnd('hello world', { length: 5 });
        expect(result).toBe('hello world');
    });

    it('should handle empty string', () => {
        const result = padEnd('', { length: 5 });
        expect(result).toBe('     ');
    });

    it('should handle non-string input by converting to string', () => {
        const result = padEnd(123, { length: 5 });
        expect(result).toBe('123  ');
    });
});
