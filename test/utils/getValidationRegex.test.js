import { describe, it, expect } from 'vitest';
import { getValidationRegex } from '../../src/utils/getValidationRegex/index.js';
import '../setup.js';

describe('utils/getValidationRegex', () => {
    it('returns regex for slash pattern in global and respects flags', () => {
        const rx = getValidationRegex('en-US', 'slashPattern');
        expect(rx).toBeInstanceOf(RegExp);
        expect(rx.test('abc')).toBe(true);
        expect(rx.test('ABC')).toBe(true);
    });

    it('returns regex for object pattern with flags', () => {
        const rx = getValidationRegex('en-US', 'alpha');
        expect(rx).toBeInstanceOf(RegExp);
        expect(rx.test('abc')).toBe(true);
    });

    it('returns regex for subkey when options.state provided', () => {
        const rx = getValidationRegex('en-US', 'licenseplate', { state: 'CA' });
        expect(rx).toBeInstanceOf(RegExp);
        // CA pattern expects a leading digit then 3 letters then 3 digits
        expect('1ABC123'.match(rx)).toBeTruthy();
    });

    it('returns null for missing mask or missing subKey', () => {
        expect(getValidationRegex('en-US', 'nonexistent')).toBeNull();
        expect(getValidationRegex('en-US', 'licenseplate')).toBeNull();
    });

    // additional smoke tests for other locales (increase coverage)
    it('parses patterns and subkeys in other locale/global entries', () => {
        const rx2 = getValidationRegex('pt-BR', 'isHexadecimal');
        expect(rx2).toBeInstanceOf(RegExp);
        expect(rx2.test('a0f')).toBe(true);

        const rx3 = getValidationRegex('pt-BR', 'isMACAddress', { subKey: 'HYPHEN' });
        expect(rx3).toBeInstanceOf(RegExp);
        expect(rx3.test('AA-BB-CC-DD-EE-FF')).toBe(true);
    });
});
