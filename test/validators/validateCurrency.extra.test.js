import { describe, it, expect } from 'vitest';
import { validateCurrency } from '../../src/validators/validateCurrency/index.js';
import '../setup.js';

describe('validateCurrency', () => {
  it('rejects non-string input', () => {
    expect(validateCurrency(123)).toEqual({
      valid: false,
      error: 'validateCurrencyInvalidType',
    });
  });

  it('rejects empty string', () => {
    expect(validateCurrency('   ', { locale: 'pt-BR' })).toEqual({
      valid: false,
      error: 'validateCurrencyIsEmpty',
    });
  });

  it('rejects when locale data missing', () => {
    expect(validateCurrency('R$ 1,00')).toEqual({
      valid: false,
      error: 'validateCurrencyMissingLocaleData',
    });
  });

  it('accepts valid positive with symbol before', () => {
    expect(validateCurrency('R$ 1,23', { locale: 'pt-BR' })).toEqual({ valid: true });
  });

  it('rejects when requireSymbol is true but symbol missing', () => {
    expect(validateCurrency('1,23', { locale: 'pt-BR', requireSymbol: true })).toEqual({
      valid: false,
      error: 'validateCurrencySymbolRequired',
    });
  });

  it('detects symbol present but in wrong position/spacing', () => {
    // pt-BR expects symbol before digits; this places it after
    const r = validateCurrency('1,23 R$', { locale: 'pt-BR' });
    expect(r.valid).toBe(false);
    expect(r.error).toBe('validateCurrencyInvalidFormat');
  });

  it('rejects when decimal digits exceed allowed via options override', () => {
    const r = validateCurrency('R$ 1,23', { locale: 'pt-BR', decimalDigits: 1 });
    expect(r.valid).toBe(false);
    expect(r.error).toBe('validateCurrencyDecimalDigits');
  });

  it('rejects invalid numeric part', () => {
    const r = validateCurrency('R$ 1,2a', { locale: 'pt-BR' });
    expect(r.valid).toBe(false);
    expect(r.error).toBe('validateCurrencyInvalidAmount');
  });

  it('rejects negative when negatives not allowed', () => {
    const r = validateCurrency('(R$ 1,00)', { locale: 'pt-BR', allowNegatives: false });
    expect(r.valid).toBe(false);
    expect(r.error).toBe('validateCurrencyNegativeNotAllowed');
  });

  it('accepts plain numeric without symbol when allowed', () => {
    const r = validateCurrency('1,23', { locale: 'pt-BR' });
    expect(r).toEqual({ valid: true });
  });
});

describe('validateCurrency extended', () => {
  it('type and empty checks', () => {
    expect(validateCurrency(123)).toEqual({
      valid: false,
      error: 'validateCurrencyInvalidType',
    });
    expect(validateCurrency('', { locale: 'en-US' })).toEqual({
      valid: false,
      error: 'validateCurrencyIsEmpty',
    });
  });

  it('valid positive and negative handling', () => {
    expect(validateCurrency('$1,234.56', { locale: 'en-US' })).toEqual({ valid: true });
    // negative allowed by default
    expect(validateCurrency('-$1.00', { locale: 'en-US' })).toEqual({ valid: true });
    // negative not allowed
    const res = validateCurrency('-$1.00', { locale: 'en-US', allowNegatives: false });
    expect(res.valid).toBe(false);
    expect(res.error).toBe('validateCurrencyNegativeNotAllowed');
  });

  it('decimal digits enforcement', () => {
    // 3 decimal digits when locale expects 2
    const res = validateCurrency('$1.234', { locale: 'en-US' });
    expect(res.valid).toBe(false);
    expect(res.error).toBe('validateCurrencyDecimalDigits');
  });
});
