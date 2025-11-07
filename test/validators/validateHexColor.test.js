import { describe, it, expect } from 'vitest';
import { validateHexColor } from '../../src/validators/validateHexColor/index.js';
import '../setup.js';

describe('validateHexColor', () => {
  it('accepts short and long hex colors with #', async () => {
    const r1 = await validateHexColor('#fff');
    expect(r1).toEqual({ valid: true });

    const r2 = await validateHexColor('#123abc');
    expect(r2).toEqual({ valid: true });
  });

  it('rejects strings without # and non-strings', async () => {
    const r1 = await validateHexColor('123abc');
    expect(r1.valid).toBe(false);

    const r2 = await validateHexColor(null);
    expect(r2).toEqual({ valid: false, error: 'invalidType' });
  });
});
