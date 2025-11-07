import { describe, it, expect } from 'vitest';
import { validateBase64 } from '../../src/validators/validateBase64/index.js';
import '../setup.js';

describe('validateBase64', () => {
  it('rejects non-string and empty values', () => {
    expect(validateBase64(123)).toEqual({ valid: false, error: 'invalidType' });
    expect(validateBase64('')).toEqual({ valid: false, error: 'validateBase64' });
  });

  it('accepts standard Base64 strings', () => {
    // 'aGVsbG8=' is 'hello' in base64
    expect(validateBase64('aGVsbG8=')).toEqual({ valid: true });
  });

  it('accepts URL-safe base64 when urlSafe=true', () => {
    // base64url without padding example
    expect(validateBase64('SGVsbG8', { urlSafe: true })).toEqual({ valid: true });
  });
});
