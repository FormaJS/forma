import { lTrim } from '../../src/sanitizers/lTrim/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('lTrim', () => {
  it('remove espaços à esquerda', () => {
    expect(lTrim('   texto')).toBe('texto');
  });

  it('não altera string sem espaços à esquerda', () => {
    expect(lTrim('texto')).toBe('texto');
  });

  it('remove caracteres customizados à esquerda', () => {
    expect(lTrim('--__texto', { chars: '-_' })).toBe('texto');
    expect(lTrim('--__texto--__', { chars: '-_' })).toBe('texto--__');
  });

  it('retorna string original se chars vazio', () => {
    expect(lTrim('  texto', { chars: '' })).toBe('  texto');
  });

  it('lida com valores não string', () => {
    expect(lTrim(123)).toBe('123');
    expect(lTrim(null)).toBe('');
  });
});
