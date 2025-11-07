import { describe, it, expect } from 'vitest';
import FormaDefault, { Forma, forma, formaBR } from '../../src/index.js';
import '../setup.js';

describe('index / Forma integration', () => {
  it('exports named Forma class and default instance, and provides preconfigured instances', () => {
    expect(typeof Forma).toBe('function');
    // default export is the pre-configured instance
    expect(typeof FormaDefault).toBe('object');
    expect(FormaDefault).toBe(forma);
    expect(forma).toBeDefined();
    expect(formaBR).toBeDefined();
  });

  it('forma instance wraps validators and returns wrapped result shape', () => {
    const res = forma.validateFloat('1.23');
    expect(res).toHaveProperty('valid');
    expect(typeof res.valid).toBe('boolean');
  });

  it('Forma.setLocale works and throws on unknown locale', () => {
    const f = new Forma('en-US');
    f.setLocale('pt-BR');
    expect(f.locale).toBe('pt-BR');
    expect(() => f.setLocale('xx-XX')).toThrow();
  });
});
