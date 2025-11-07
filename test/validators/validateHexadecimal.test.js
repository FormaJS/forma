import { describe, it, expect } from 'vitest';
import { validateHexadecimal } from '../../src/validators/validateHexadecimal/index.js';
import '../setup.js';

describe('validateHexadecimal', () => {
  it('rejects non-string types', async () => {
    const r = await validateHexadecimal(123);
    expect(r).toEqual({ valid: false, error: 'invalidType' });
  });

  it('accepts valid hex and rejects invalid strings', async () => {
    const ok = await validateHexadecimal('deadBEEF');
    expect(ok).toEqual({ valid: true });

    const bad = await validateHexadecimal('not-hex');
    expect(bad.valid).toBe(false);
    expect(bad.error).toBe('validateHexadecimal');
  });
});
