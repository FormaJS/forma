import { describe, it, expect } from 'vitest';
import { toSlug } from '../../src/sanitizers/toSlug/index.js';
import '../setup.js';

describe('toSlug sanitizer', () => {
    it('creates a lowercase hyphen-separated slug by default', () => {
        expect(toSlug('Hello World')).toBe('hello-world');
    });

    it('removes diacritics and collapses spaces', () => {
        expect(toSlug('Áé Í')).toBe('ae-i');
    });

    it('respects custom separator and keeps case when lowercase=false', () => {
        expect(toSlug('Hello World', { separator: '_', lowercase: false })).toBe('Hello_World');
    });
});
