import { describe, it, expect } from 'vitest';
import { isValidISODateString } from '../../src/utils/isValidISODateString/index.js';

describe('isValidISODateString', () => {
  it('retorna true para formato lenient simples YYYY-MM-DD', () => {
    expect(isValidISODateString('2024-02-29')).toBe(true); // ano bissexto
  });

  it('retorna false para data inexistente', () => {
    expect(isValidISODateString('2023-02-29')).toBe(false);
  });

  it('retorna true para formato estrito completo', () => {
    expect(isValidISODateString('2025-11-10T15:30:45Z', { strict: true })).toBe(true);
  });

  it('retorna false para formato estrito incompleto', () => {
    expect(isValidISODateString('2025-11-10', { strict: true })).toBe(false);
  });

  it('retorna false para string inválida', () => {
    expect(isValidISODateString('not-a-date')).toBe(false);
  });
});
