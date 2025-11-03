import { describe, it, expect } from 'vitest';
import { getNormalizedNumberString } from '../../src/utils/getNormalizedNumberString/index.js';
import '../setup.js';

describe('utils/getNormalizedNumberString', () => {
    it('converts pt-BR formatted number to normalized string', () => {
        const out = getNormalizedNumberString('1.234,56', 'pt-BR');
        expect(out).toBe('1234.56');
    });

    it('converts en-US formatted number to normalized string', () => {
        const out = getNormalizedNumberString('1,234.56', 'en-US');
        expect(out).toBe('1234.56');
    });

    it('leaves simple numeric string unchanged when locale not provided', () => {
        expect(getNormalizedNumberString('1234.56')).toBe('1234.56');
    });
});
