import { describe, it, expect } from 'vitest';
import { toBoolean } from '../../src/parsers/toBoolean/index.js';
import '../setup.js';

describe('toBoolean parser', () => {
  it('returns false when locale not provided', () => {
    expect(toBoolean('true')).toBe(false);
  });

  it('recognizes truthy values for en-US', () => {
    expect(toBoolean('true', { locale: 'en-US' })).toBe(true);
    expect(toBoolean('yes', { locale: 'en-US' })).toBe(true);
    expect(toBoolean('1', { locale: 'en-US' })).toBe(true);
    expect(toBoolean('false', { locale: 'en-US' })).toBe(false);
  });

  it('respects pt-BR locale rules', () => {
    expect(toBoolean('verdadeiro', { locale: 'pt-BR' })).toBe(true);
    expect(toBoolean('sim', { locale: 'pt-BR' })).toBe(true);
    expect(toBoolean('nao', { locale: 'pt-BR' })).toBe(false);
  });
});
