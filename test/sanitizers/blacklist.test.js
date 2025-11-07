import { describe, it, expect } from 'vitest';
import { blacklist } from '../../src/sanitizers/blacklist/index.js';
import '../setup.js';

describe('blacklist sanitizer', () => {
  it('removes blacklisted chars', () => {
    expect(blacklist('abcXYZ123', { chars: 'XYZ' })).toBe('abc123');
  });

  it('replaces blacklisted words with replacementChar', () => {
    expect(blacklist('foo bar baz', { words: ['bar'], replacementChar: '_' })).toBe('foo _ baz');
  });

  it('is case-insensitive when strict=false', () => {
    expect(blacklist('Foo BAR Baz', { words: ['bar'], strict: false })).toBe('Foo  Baz');
  });
});
