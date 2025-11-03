import { describe, it, expect } from 'vitest';
import { getValidationRegex } from '../../src/utils/getValidationRegex/index.js';
import '../setup.js';

describe('getValidationRegex slash-style string parsing', () => {
    it('parses slash-style string like "/^abc$/i" and respects flags', () => {
        const rx = getValidationRegex('en-US', 'slashPattern');
        expect(rx).toBeInstanceOf(RegExp);
        expect(rx.test('abc')).toBe(true);
        expect(rx.test('ABC')).toBe(true); // flags include i
    });
});
