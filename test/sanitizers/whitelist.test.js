import { describe, it, expect } from 'vitest';
import { whitelist } from '../../src/sanitizers/whitelist/index.js';
import '../setup.js';

describe('whitelist sanitizer', () => {
  it('keeps only allowed characters when chars provided', () => {
    const input = 'aXbYcZ123';
    expect(whitelist(input, { chars: 'abc' })).toBe('abc');
  });

  it('returns concatenated matched words when words provided', () => {
    const input = 'foo bar baz qux';
    expect(whitelist(input, { words: ['bar', 'baz'] })).toBe('barbaz');
  });

  it('honors case-insensitive matching when strict=false for words', () => {
    const input = 'Foo BAR baZ';
    expect(whitelist(input, { words: ['bar'], strict: false })).toBe('BAR');
  });

  it('returns empty string if no chars or words provided', () => {
    expect(whitelist('anything')).toBe('');
  });
});
