import { describe, it, expect } from 'vitest';
import { validateJWT } from '../../src/validators/validateJWT/index.js';
import '../setup.js';

describe('validateJWT', () => {
  it('rejects non-string types', () => {
    expect(validateJWT(123)).toEqual({ valid: false, error: 'invalidType' });
  });

  it('accepts a string in JWT format (header.payload.signature)', () => {
    // header.payload.signature with base64url chars
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    expect(validateJWT(token)).toEqual({ valid: true });
  });

  it('rejects malformed tokens', () => {
    expect(validateJWT('not-a.jwt')).toEqual({ valid: false, error: 'validateJWT' });
  });
});
