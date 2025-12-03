import { describe, it, expect } from 'vitest';
import { executeI18nValidationRule } from '../../src/utils/executeI18nValidationRule/index.js';
import { registerLocale } from '../../src/i18n/index.js';

registerLocale('en-US', (await import('../../src/i18n/lang/en-US.json')).default);

describe('executeI18nValidationRule - function path (validateTaxId)', () => {
  it('valida SSN válido via função', async () => {
    const res = await executeI18nValidationRule('en-US', 'taxid', '123-45-6789');
    expect(res.valid).toBe(true);
  });
  it('valida EIN válido via função', async () => {
    const resEIN = await executeI18nValidationRule('en-US', 'taxid', '12-3456789');
    expect(resEIN.valid).toBe(true);
  });
});
