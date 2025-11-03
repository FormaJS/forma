import { rTrim } from '../../src/sanitizers/rTrim/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('rTrim', () => {
    it('remove espaços à direita', () => {
        expect(rTrim('texto   ')).toBe('texto');
    });

    it('não altera string sem espaços à direita', () => {
        expect(rTrim('texto')).toBe('texto');
    });

    it('remove caracteres customizados à direita', () => {
        expect(rTrim('texto__--', { chars: '-_' })).toBe('texto');
        expect(rTrim('--____--texto__--', { chars: '-_' })).toBe('--____--texto');
    });

    it('retorna string original se chars vazio', () => {
        expect(rTrim('texto  ', { chars: '' })).toBe('texto  ');
    });

    it('lida com valores não string', () => {
        expect(rTrim(123)).toBe('123');
        expect(rTrim(null)).toBe('');
    });
});
