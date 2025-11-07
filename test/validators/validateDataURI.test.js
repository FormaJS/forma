import { validateDataURI } from '../../src/validators/validateDataURI/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateDataURI', () => {
  it('valida Data URI correto', () => {
    expect(validateDataURI('data:text/plain;base64,SGVsbG8=')).toEqual({ valid: true });
    expect(
      validateDataURI(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
      )
    ).toEqual({ valid: true });
  });

  it('retorna erro para Data URI inválido', () => {
    const result = validateDataURI('invalid');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('validateDataURI');
  });

  it('retorna erro para tipo inválido', () => {
    const result = validateDataURI(123);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('invalidType');
  });
});
