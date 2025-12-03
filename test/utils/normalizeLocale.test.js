import { describe, it, expect } from 'vitest';
import { normalizeLocale } from '../../src/utils/normalizeLocale/index.js';

describe('normalizeLocale', () => {
  it('normaliza com hífen', () => {
    expect(normalizeLocale('pt-br')).toBe('pt-BR');
  });
  it('normaliza com underscore', () => {
    expect(normalizeLocale('en_us')).toBe('en-US');
  });
  it('retorna vazio para inválido', () => {
    expect(normalizeLocale('invalid')).toBe('');
    expect(normalizeLocale(123)).toBe('');
  });
});
