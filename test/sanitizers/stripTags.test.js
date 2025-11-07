import { describe, it, expect } from 'vitest';
import { stripTags } from '../../src/sanitizers/stripTags/index.js';
import '../setup.js';

describe('stripTags', () => {
  it('removes tags when no allowTags provided', () => {
    const input = '<p>Hello <strong>World</strong></p>';
    expect(stripTags(input)).toBe('Hello World');
  });

  it('preserves allowed tags', () => {
    const input = '<p>Hello <strong>World</strong></p>';
    expect(stripTags(input, { allowTags: ['strong'] })).toBe('Hello <strong>World</strong>');
  });

  it('handles non-string gracefully', () => {
    expect(stripTags(null)).toBe('');
  });
});
