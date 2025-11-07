import { describe, it, expect } from 'vitest';
import { validateMultibyte } from '../../src/validators/validateMultibyte/index.js';
import '../setup.js';

describe('validateMultibyte', () => {
  it('rejects non-string types', async () => {
    const r = await validateMultibyte(123);
    expect(r).toEqual({ valid: false, error: 'invalidType' });
  });

  it('accepts strings with multibyte characters and rejects ASCII-only', async () => {
    const ok = await validateMultibyte('olá');
    expect(ok).toEqual({ valid: true });

    const bad = await validateMultibyte('hello');
    expect(bad.valid).toBe(false);
    expect(bad.error).toBe('validateMultibyte');
  });
});
