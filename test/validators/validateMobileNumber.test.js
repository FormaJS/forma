import { describe, it, expect } from 'vitest';
import { validateMobileNumber } from '../../src/validators/validateMobileNumber/index.js';
import '../setup.js';

describe('validateMobileNumber', () => {
  it('rejects non-string types immediately', async () => {
    const r = await validateMobileNumber(12345);
    expect(r).toEqual({ valid: false, error: 'invalidType' });
  });

  it('requires locale option and returns localeRequired when missing', async () => {
    const r = await validateMobileNumber('5511999999999');
    expect(r).toEqual({ valid: false, error: 'localeRequired' });
  });

  it('when locale provided returns an object (delegates to i18n rule) - accepts boolean/object responses', async () => {
    // We don't assert the exact validation logic here (it delegates to i18n rules).
    // Just ensure it returns a well-formed result when locale is present.
    const r = await validateMobileNumber('not-a-number', { locale: 'pt-BR' });
    expect(typeof r).toBe('object');
    expect(r).toHaveProperty('valid');
  });
});
