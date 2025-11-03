import { describe, it, expect } from 'vitest';
import { toString, isString, escapeRegex } from '../../src/utils/index.js';
import '../setup.js';

describe('utils index re-exports', () => {
    it('re-exports toString and isString and escapeRegex', () => {
        expect(typeof toString).toBe('function');
        expect(isString('x')).toBe(true);
        // escapeRegex is a RegExp exported from htmlEntities module; ensure it exists
        expect(escapeRegex instanceof RegExp).toBe(true);
    });
});
