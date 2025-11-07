import { validateIBAN } from '../../src/validators/validateIBAN/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateIBAN', () => {
  it('valida IBAN correto', () => {
    expect(validateIBAN('GB29 NWBK 6016 1331 9268 19', { whitelist: ['GB'] })).toEqual({
      valid: true,
    });
    expect(validateIBAN('DE89370400440532013000', { whitelist: ['DE'] })).toEqual({
      valid: true,
    });
  });

  it('retorna erro para IBAN com formato inválido', () => {
    const result = validateIBAN('INVALID', { whitelist: ['GB'] });
    expect(result.valid).toBe(false);
    expect(result.error).toBe('validateIBANFormat');
  });

  it('retorna erro para IBAN com checksum inválido', () => {
    const result = validateIBAN('GB29 NWBK 6016 1331 9268 18', { whitelist: ['GB'] });
    expect(result.valid).toBe(false);
    expect(result.error).toBe('validateIBANChecksum');
  });

  it('retorna erro para país na blacklist', () => {
    const result = validateIBAN('GB29 NWBK 6016 1331 9268 19', { blacklist: ['GB'] });
    expect(result.valid).toBe(false);
    expect(result.error).toBe('validateIBANBlacklist');
  });

  it('retorna erro para país não na whitelist', () => {
    const result = validateIBAN('GB29 NWBK 6016 1331 9268 19', { whitelist: ['DE'] });
    expect(result.valid).toBe(false);
    expect(result.error).toBe('validateIBANWhitelist');
  });

  it('retorna erro para tipo inválido', () => {
    const result = validateIBAN(123, { whitelist: ['GB'] });
    expect(result.valid).toBe(false);
    expect(result.error).toBe('invalidType');
  });
});
