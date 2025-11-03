import { describe, it, expect } from 'vitest';
import { escapeHTML } from '../../src/sanitizers/escapeHTML/index.js';
import '../setup.js';

describe('escapeHTML sanitizer', () => {
    it('escapes special HTML characters', () => {
        // build input with the five characters we escape
        const input = '&<>"\'';
        const out = escapeHTML(input);
        expect(out).toBe('&amp;&lt;&gt;&quot;&#x27;');
    });

    it('returns empty string for null/undefined via toString', () => {
        expect(escapeHTML(null)).toBe('');
        expect(escapeHTML(undefined)).toBe('');
    });
});
