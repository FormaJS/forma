import { validateHSL } from '../../src/validators/validateHSL/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('validateHSL', () => {
  it('valida HSL correto', () => {
    expect(validateHSL('hsl(120, 50%, 50%)')).toEqual({ valid: true });
    expect(validateHSL('hsla(240, 100%, 50%, 0.5)')).toEqual({ valid: true });
    expect(validateHSL('HSL(0, 0%, 0%)')).toEqual({ valid: true });
  });

  it('retorna erro para HSL inválido', () => {
    const result = validateHSL('invalid');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('validateHSL');
  });

  it('retorna erro para tipo inválido', () => {
    const result = validateHSL(123);
    expect(result.valid).toBe(false);
    expect(result.error).toBe('invalidType');
  });
});
