import { describe, it, expect } from 'vitest';
import { addExtension, getExtensions, extensions } from '../../src/extensions/index.js';
import '../setup.js';

describe('extensions module', () => {
  it('starts with an array and exposes helpers', () => {
    expect(Array.isArray(extensions)).toBe(true);
    const before = getExtensions().length;

    function ext() {
      return 'x';
    }

    addExtension(ext);
    const after = getExtensions().length;
    expect(after).toBe(before + 1);
    // last extension is the function we added
    expect(getExtensions()[getExtensions().length - 1]).toBe(ext);
  });

  it('throws when adding non-function', () => {
    expect(() => addExtension({})).toThrow();
  });
});
