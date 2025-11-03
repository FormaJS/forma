import { describe, it, expect } from 'vitest';
import { getValidationRegex } from '../../src/utils/getValidationRegex/index.js';
import '../setup.js';

describe('getValidationRegex badRegex handling', () => {
    it('returns null for a regex object with invalid pattern', () => {
        const rx = getValidationRegex('pt-BR', 'badRegex');
        expect(rx).toBeNull();
    });
});
