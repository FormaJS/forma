import { validateISBN } from '../../src/validators/validateISBN/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateISBN', () => {
  it('valida ISBN-10 correto', () => {
    expect(validateISBN('0306406152', { locale: 'en-US' })).toEqual({ valid: true });
    expect(validateISBN('0-306-40615-2', { locale: 'en-US' })).toEqual({ valid: true });
  });

  it('valida ISBN-13 correto', () => {
    expect(validateISBN('9780306406157', { locale: 'en-US' })).toEqual({ valid: true });
    expect(validateISBN('978-0-306-40615-7', { locale: 'en-US' })).toEqual({ valid: true });
  });

  it('força versão 10', () => {
    expect(validateISBN('0306406152', { locale: 'en-US', version: 10 })).toEqual({
      valid: true,
    });
    const result = validateISBN('9780306406157', { locale: 'en-US', version: 10 });
    expect(result.valid).toBe(false);
  });

  it('força versão 13', () => {
    expect(validateISBN('9780306406157', { locale: 'en-US', version: 13 })).toEqual({
      valid: true,
    });
    const result = validateISBN('0306406152', { locale: 'en-US', version: 13 });
    expect(result.valid).toBe(false);
  });

  it('retorna erro para ISBN com formato inválido', () => {
    const result = validateISBN('invalid', { locale: 'en-US' });
    expect(result.valid).toBe(false);
    expect(result.error).toBe('validateISBNFormat');
  });

  it('retorna erro para ISBN-10 com checksum inválido', () => {
    const result = validateISBN('0306406153', { locale: 'en-US' });
    expect(result.valid).toBe(false);
    expect(result.error).toBe('validateISBN10Checksum');
  });

  it('retorna erro para ISBN-13 com checksum inválido', () => {
    const result = validateISBN('9780306406158', { locale: 'en-US' });
    expect(result.valid).toBe(false);
    expect(result.error).toBe('validateISBN13Checksum');
  });

  it('retorna erro se locale não informado', () => {
    const result = validateISBN('0306406152');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('localeRequired');
  });

  it('retorna erro para tipo inválido', () => {
    const result = validateISBN(123, { locale: 'en-US' });
    expect(result.valid).toBe(false);
    expect(result.error).toBe('invalidType');
  });
});
