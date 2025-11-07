import { describe, it, expect } from 'vitest';
import { validateIP } from '../../src/validators/validateIP/index.js';
import '../setup.js';

describe('validateIP', () => {
  it('rejects non-string types and invalid addresses', () => {
    expect(validateIP(123)).toEqual({ valid: false, error: 'invalidType' });
    expect(validateIP('not.an.ip')).toEqual({ valid: false, error: 'validateIP' });
  });

  it('validates IPv4 and IPv6 and respects version option', () => {
    expect(validateIP('127.0.0.1')).toEqual({ valid: true });
    expect(validateIP('::1')).toEqual({ valid: true });
    expect(validateIP('127.0.0.1', { version: '4' })).toEqual({ valid: true });
    const r = validateIP('::1', { version: '4' });
    expect(r.valid).toBe(false);
    expect(r.error).toBe('validateIPV4');
  });
});
