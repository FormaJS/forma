import { describe, it, expect } from 'vitest';
import { executeI18nValidationRule } from '../../src/utils/executeI18nValidationRule/index.js';
import '../setup.js';

describe('utils/executeI18nValidationRule', () => {
  it('validates using global slashPattern regex', async () => {
    const res = await executeI18nValidationRule('en-US', 'slashPattern', 'abc');
    expect(res).toEqual({ valid: true });
  });

  it('returns invalidRule when rule missing', async () => {
    const res = await executeI18nValidationRule('en-US', 'no-such-rule', 'x');
    expect(res.valid).toBe(false);
    expect(res.error).toBe('invalidRule');
  });

  it('handles validator that throws and returns genericError', async () => {
    const res = await executeI18nValidationRule('en-US', 'willThrow', 'x');
    expect(res.valid).toBe(false);
    expect(res.error).toBe('genericError');
    expect(res.context && typeof res.context.details === 'string').toBe(true);
    expect(res.context.details).toContain('test-throw');
  });

  it('validates regex-based rule (isHexadecimal)', async () => {
    const res = await executeI18nValidationRule('pt-BR', 'isHexadecimal', 'A1B2');
    expect(res).toEqual({ valid: true });
  });

  it('respects caseSensitive option when provided', async () => {
    // the rule is case-insensitive by default; forcing caseSensitive true should still work
    const r1 = await executeI18nValidationRule('pt-BR', 'isHexadecimal', 'a1b2', {
      caseSensitive: false,
    });
    expect(r1).toEqual({ valid: true });
  });

  it('returns invalidRule for unknown rule keys', async () => {
    const r = await executeI18nValidationRule('pt-BR', 'no-such-rule', 'x');
    expect(r.valid).toBe(false);
    expect(r.error).toBe('invalidRule');
  });

  it('executes function-based rule (taxid -> pt-BR implementation)', async () => {
    // Use a known-valid CPF from existing tests
    const validCPF = '01006735038';
    const r = await executeI18nValidationRule('pt-BR', 'taxid', validCPF);
    // executor should call the pt-BR specific validator and return a boolean-wrapped result
    expect(r).toEqual({ valid: true });
  });

  it('falls back to validator index when locale-specific module is absent', async () => {
    const r = await executeI18nValidationRule('pt-BR', 'useFallbackValidator', 'x');
    expect(r).toEqual({ valid: true });
  });

  it('returns genericError when validator throws', async () => {
    const r = await executeI18nValidationRule('pt-BR', 'willThrow', 'x');
    expect(r.valid).toBe(false);
    expect(r.error).toBe('genericError');
  });

  it('returns validateMatchesInvalid when options.flags contains invalid flags', async () => {
    // Provide an invalid flag to force RegExp constructor to throw when executor
    // rebuilds the regex with the provided flags.
    const r = await executeI18nValidationRule('pt-BR', 'isHexadecimal', 'a1b2', { flags: 'z' });
    expect(r.valid).toBe(false);
    expect(r.error).toBe('validateMatchesInvalid');
  });

  it('respects explicit flags override (options.flags) and can change matching', async () => {
    // isHexadecimal is case-insensitive by default; overriding flags to '' should fail lowercase
    const r = await executeI18nValidationRule('pt-BR', 'isHexadecimal', 'a1b2', { flags: '' });
    expect(r).toEqual({ valid: false });
  });

  it('returns invalidRule when the underlying regex is invalid (badRegex)', async () => {
    const r = await executeI18nValidationRule('pt-BR', 'badRegex', 'x');
    expect(r.valid).toBe(false);
    expect(r.error).toBe('invalidRule');
  });
});
