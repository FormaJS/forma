import { validateISSN } from '../../src/validators/validateISSN/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateISSN', () => {
  it('valida ISSN correto', () => {
    expect(validateISSN('00280836')).toEqual({ valid: true });
    expect(validateISSN('0028-0836')).toEqual({ valid: true });
  });

  it('retorna erro para ISSN com formato inválido', () => {
    const result = validateISSN('invalid');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('validateISSNFormat');
  });

  it('retorna erro para ISSN com checksum inválido', () => {
    const result = validateISSN('00249318');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('validateISSNChecksum');
  });

  it('retorna erro para tipo inválido', () => {
    const result = validateISSN(123);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('invalidType');
  });
});
