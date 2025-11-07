import { validateISRC } from '../../src/validators/validateISRC/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateISRC', () => {
  it('valida ISRC correto', () => {
    expect(validateISRC('USPR37300012')).toEqual({ valid: true });
    expect(validateISRC('US-PR3-73-00012')).toEqual({ valid: true });
  });

  it('retorna erro para ISRC inválido', () => {
    const result = validateISRC('invalid');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('validateISRC');
  });

  it('retorna erro para tipo inválido', () => {
    const result = validateISRC(123);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('invalidType');
  });
});
