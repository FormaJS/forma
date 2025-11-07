import { describe, it, expect } from 'vitest';
import { validateSurrogatePair } from '../../src/validators/validateSurrogatePair/index.js';
import '../setup.js';

describe('validateSurrogatePair', () => {
  it('rejects non-string types', async () => {
    const res = await validateSurrogatePair(123);
    expect(res).toEqual({ valid: false, error: 'invalidType' });
  });

  it('returns false when no surrogate pairs present', async () => {
    const res = await validateSurrogatePair('plain ascii');
    expect(res.valid).toBe(false);
    expect(res.error).toBe('validateSurrogatePair');
  });

  it('returns true when string contains emoji (surrogate pair)', async () => {
    const res = await validateSurrogatePair('hello 😀 world');
    expect(res.valid).toBe(true);
  });
});
