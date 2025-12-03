import { describe, it, expect } from 'vitest';
import { toParts, toPercentage, toAccessible } from '../../src/formatters/index.js';
import '../../src/i18n/locales/es-ES.js';
import '../../src/i18n/locales/fr-FR.js';
import '../../src/i18n/locales/it-IT.js';
import '../../src/i18n/locales/de-DE.js';

describe('New Formatters', () => {
    describe('toParts', () => {
        it('should format parts correctly for en-US', () => {
            const parts = toParts(1234.56, 'en-US');
            // Expecting: integer: 1,234, decimal: ., fraction: 56
            // Note: Intl parts are more granular (group, integer, etc)
            // [ { type: 'integer', value: '1' }, { type: 'group', value: ',' }, { type: 'integer', value: '234' }, ... ]
            // Wait, user example showed simplified parts?
            // User example:
            // [ { type: 'integer', value: '1,234' }, ... ]
            // Intl.NumberFormat.formatToParts returns:
            // [ { type: "integer", value: "1" }, { type: "group", value: "," }, { type: "integer", value: "234" }, { type: "decimal", value: "." }, { type: "fraction", value: "56" } ]
            // The user example might have been illustrative or expected simplified output.
            // My implementation returns standard Intl parts.
            // Let's verify what Intl returns.

            const types = parts.map(p => p.type);
            expect(types).toContain('integer');
            expect(types).toContain('decimal');
            expect(types).toContain('fraction');
        });

        it('should format parts correctly for pt-BR', () => {
            const parts = toParts(1234.56, 'pt-BR');
            const decimal = parts.find(p => p.type === 'decimal');
            expect(decimal.value).toBe(',');
        });
    });

    describe('toPercentage', () => {
        it('should format percentage for pt-BR', () => {
            expect(toPercentage(0.5, 'pt-BR')).toBe('50%');
        });

        it('should format percentage for en-US', () => {
            expect(toPercentage(0.5, 'en-US')).toBe('50%');
        });

        it('should handle decimals', () => {
            expect(toPercentage(0.1234, 'en-US', { minimumFractionDigits: 2 })).toBe('12.34%');
        });
    });

    describe('toAccessible', () => {
        describe('pt-BR', () => {
            it('should format full text (extenso) for integers', () => {
                expect(toAccessible(1200000, 'pt-BR')).toBe('um milhão e duzentos mil');
            });

            it('should format full text with decimals', () => {
                // "12.34" -> "doze vírgula três quatro"
                expect(toAccessible(12.34, 'pt-BR')).toBe('doze vírgula três quatro');
            });

            it('should format abbreviated', () => {
                // User example: "um ponto dois milhões"
                // My implementation uses "ponto" for pt-BR in abbreviated mode to match request.
                // 1200000 -> 1.2M -> "um ponto dois milhões"
                expect(toAccessible(1200000, 'pt-BR', { mode: 'abbreviated' })).toBe('um ponto dois milhões');
            });
        });

        describe('en-US', () => {
            it('should format full text', () => {
                expect(toAccessible(1200000, 'en-US')).toBe('one million two hundred thousand');
            });

            it('should format abbreviated', () => {
                // 1200000 -> 1.2M -> "one point two million"
                expect(toAccessible(1200000, 'en-US', { mode: 'abbreviated' })).toBe('one point two million');
            });
        });

        describe('es-ES', () => {
            it('should format full text', () => {
                expect(toAccessible(123, 'es-ES')).toBe('ciento veintitres');
            });
        });

        describe('fr-FR', () => {
            it('should format full text', () => {
                expect(toAccessible(123, 'fr-FR')).toBe('cent vingt-trois');
            });
        });

        describe('it-IT', () => {
            it('should format full text', () => {
                expect(toAccessible(123, 'it-IT')).toBe('centoventitre');
            });
        });

        describe('de-DE', () => {
            it('should format full text', () => {
                expect(toAccessible(123, 'de-DE')).toBe('einhundertdreiundzwanzig');
            });
        });
    });
});

