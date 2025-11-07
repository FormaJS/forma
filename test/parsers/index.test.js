import { describe, it, expect } from 'vitest';
import * as parsers from '../../src/parsers/index.js';
import '../setup.js';

describe('parsers index exports', () => {
  it('exports parser functions like toFloat/toInt/toJSON/toBoolean', () => {
    expect(typeof parsers.toFloat).toBe('function');
    expect(typeof parsers.toInt).toBe('function');
    expect(typeof parsers.toJSON).toBe('function');
    expect(typeof parsers.toBoolean).toBe('function');
  });
});
