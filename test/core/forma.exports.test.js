import FormaDefault, { Forma as FormaNamed, forma } from '../../src/index.js';
import { describe, it, expect } from 'vitest';
import '../setup.js';

describe('core Forma exports and instance binding', () => {
  it('exports the Forma named class and a default instance', () => {
    // default export is now the pre-configured instance
    expect(typeof FormaNamed).toBe('function');
    expect(typeof FormaDefault).toBe('object');
    // default instance should equal the named `forma` export
    expect(FormaDefault).toBe(forma);
  });

  it('instantiates and binds parser/validator/sanitizer methods', () => {
    const inst = new FormaNamed('en-US');
    // parser: toFloat should parse a simple en-US number
    expect(inst.toFloat('1.23')).toBeCloseTo(1.23);

    // validator: validateFloat returns an object with valid:true
    const vres = inst.validateFloat('1.23');
    expect(vres && vres.valid).toBe(true);

    // sanitizer: toSlug should be available and work
    expect(inst.toSlug('Hello World')).toBe('hello-world');
  });

  it('allows changing locale and affects parsers', () => {
    const inst = new FormaNamed('en-US');
    // in en-US a comma may be interpreted as thousand separator -> 1234
    expect(inst.toFloat('1,234')).toBeCloseTo(1234);

    inst.setLocale('pt-BR');
    // now comma is decimal separator in pt-BR
    expect(inst.toFloat('1.234,56')).toBeCloseTo(1234.56);
    // the default preconfigured instance also parses en-US numbers
    expect(forma.toFloat('1.23')).toBeCloseTo(1.23);
  });
});
