import { describe, it, expect } from 'vitest';
import { unescapeHTML } from '../../src/sanitizers/unescapeHTML/index.js';
import '../setup.js';

describe('unescapeHTML sanitizer', () => {
  it('unescapes common HTML entities', () => {
    const input = '&amp;&lt;&gt;&quot;&#x27;';
    expect(unescapeHTML(input)).toBe('&<>"\'');
  });

  it('returns empty string for non-string/null via toString', () => {
    expect(unescapeHTML(null)).toBe('');
  });
});
