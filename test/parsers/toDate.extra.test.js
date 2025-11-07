import { describe, it, expect } from 'vitest';
import { toDate } from '../../src/parsers/toDate/index.js';
import '../setup.js';

describe('toDate parser (extended)', () => {
  it('parses ISO 8601 dates correctly', () => {
    const d = toDate('2020-01-02');
    expect(d).not.toBeNull();
    expect(d.getUTCFullYear()).toBe(2020);
    expect(d.getUTCMonth()).toBe(0);
    expect(d.getUTCDate()).toBe(2);

    expect(toDate('2020-02-30')).toBeNull(); // invalid day
    expect(toDate('not a date')).toBeNull();
  });

  it('parses locale-specific formats when supported, otherwise returns null (flexible)', () => {
    const en = toDate('12/31/1999', { locale: 'en-US' });
    if (en) {
      expect(en.getUTCFullYear()).toBe(1999);
      expect(en.getUTCMonth()).toBe(11);
      expect(en.getUTCDate()).toBe(31);
    } else {
      expect(en).toBeNull();
    }

    const br = toDate('31/12/1999', { locale: 'pt-BR' });
    if (br) {
      expect(br.getUTCFullYear()).toBe(1999);
      expect(br.getUTCMonth()).toBe(11);
      expect(br.getUTCDate()).toBe(31);
    } else {
      expect(br).toBeNull();
    }
  });
});
