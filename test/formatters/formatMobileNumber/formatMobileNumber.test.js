import { describe, it, expect } from 'vitest';
import { formatMobileNumber } from '../../../src/formatters/formatMobileNumber/index.js';

describe('formatMobileNumber', () => {
  it('should format mobile number for pt-BR locale', () => {
    const result = formatMobileNumber('11987654321', { locale: 'pt-BR' });
    expect(result).toBe('(11) 98765-4321');
  });

  it('should format mobile number for en-US locale', () => {
    const result = formatMobileNumber('1234567890', { locale: 'en-US' });
    expect(result).toBe('(123) 456-7890');
  });

  it('should return digits if locale is missing', () => {
    const result = formatMobileNumber('11987654321', {});
    expect(result).toBe('11987654321');
  });

  it('should return digits if mask is not found', () => {
    const result = formatMobileNumber('12345', { locale: 'pt-BR' });
    expect(result).toBe('12345');
  });
});
