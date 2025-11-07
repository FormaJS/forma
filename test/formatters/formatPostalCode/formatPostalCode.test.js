import { describe, it, expect } from 'vitest';
import { formatPostalCode } from '../../../src/formatters/formatPostalCode/index.js';

describe('formatPostalCode', () => {
  it('should format postal code for pt-BR locale', () => {
    const result = formatPostalCode('12345678', { locale: 'pt-BR' });
    expect(result).toBe('12345-678');
  });

  it('should format postal code for en-US locale', () => {
    const result = formatPostalCode('12345678', { locale: 'en-US' });
    expect(result).toBe('12345-678');
  });

  it('should return digits if locale is missing', () => {
    const result = formatPostalCode('12345678', {});
    expect(result).toBe('12345678');
  });

  it('should return digits if mask is not found', () => {
    const result = formatPostalCode('12345678', { locale: 'invalid' });
    expect(result).toBe('12345678');
  });
});
