import { trim } from '../../src/sanitizers/trim/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('trim', () => {
  it('remove espaços nas extremidades', () => {
    expect(trim('   texto   ')).toBe('texto');
  });

  it('não altera string sem espaços nas extremidades', () => {
    expect(trim('texto')).toBe('texto');
  });

  it('remove caracteres customizados nas extremidades', () => {
    expect(trim('--__texto__--', { chars: '-_' })).toBe('texto');
  });

  it('retorna string original se chars vazio', () => {
    expect(trim('  texto  ', { chars: '' })).toBe('  texto  ');
  });

  it('lida com valores não string', () => {
    expect(trim(123)).toBe('123');
    expect(trim(null)).toBe('');
  });
});
