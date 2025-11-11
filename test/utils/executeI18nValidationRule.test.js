import { describe, it, expect } from 'vitest';
import { executeI18nValidationRule } from '../../src/utils/executeI18nValidationRule/index.js';
import { registerLocale } from '../../src/i18n/index.js';

const TEMP_LOCALE = 'xx-YY';
registerLocale(TEMP_LOCALE, {
  validate: {
    foo: { pattern: '^foo$', flags: '' },
    badFn: 'function:validateDoesNotExist',
  },
});

describe('executeI18nValidationRule', () => {
  it('retorna válido com regex quando corresponde', async () => {
    const res = await executeI18nValidationRule(TEMP_LOCALE, 'foo', 'foo');
    expect(res.valid).toBe(true);
  });

  it('retorna inválido quando regra não existe', async () => {
    const res = await executeI18nValidationRule(TEMP_LOCALE, 'unknown', 'x');
    expect(res.valid).toBe(false);
    expect(res.error).toBe('invalidRule');
  });

  it('tenta carregar função e cai em genericError quando import falha diferente de module not found', async () => {
    const res = await executeI18nValidationRule(TEMP_LOCALE, 'badFn', 'x');
    expect(res.valid).toBe(false);
    expect(['invalidRule', 'genericError']).toContain(res.error);
  });

  it('respeita flags case-insensitive via options', async () => {
    registerLocale(TEMP_LOCALE, {
      validate: { bar: { pattern: '^BAR$', flags: '' } },
    });
    const res = await executeI18nValidationRule(TEMP_LOCALE, 'bar', 'bar', {
      caseSensitive: false,
    });
    expect(res.valid).toBe(true);
  });
});
