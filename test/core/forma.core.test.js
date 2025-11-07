import { describe, it, expect } from 'vitest';
import { Forma } from '../../src/core/forma.js';
import '../setup.js';

describe('core/Forma basic binding', () => {
  it('binds synchronous validators and returns normalized result', () => {
    const f = new Forma('en-US');
    // validateAlpha is synchronous and should accept 'abc'
    const res = f.validateAlpha('abc');
    expect(res.valid).toBe(true);
    expect(res.message).toBeNull();
  });

  it('handles async validators (returns a Promise) and resolves correctly', async () => {
    const f = new Forma('en-US');
    // validateTaxId is async in validators index (it delegates to executor)
    const p = f.validateTaxId('123-45-6789');
    expect(typeof p.then).toBe('function');
    const resolved = await p;
    expect(resolved.valid).toBe(true);
    expect(resolved.message).toBeNull();
  });

  it('setLocale throws for unknown locale and updates for known locale', () => {
    const f = new Forma('en-US');
    expect(() => f.setLocale('xx-XX')).toThrow();
    f.setLocale('pt-BR');
    expect(f.locale).toBe('pt-BR');
  });
});
