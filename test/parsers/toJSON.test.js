import { describe, it, expect } from 'vitest';
import { toJSON } from '../../src/parsers/toJSON/index.js';
import '../setup.js';

describe('toJSON parser', () => {
  it('parses valid JSON strings', () => {
    expect(toJSON('{"a":1}')).toEqual({ a: 1 });
    expect(toJSON('"hello"')).toBe('hello');
  });

  it('returns null for invalid JSON or non-strings', () => {
    expect(toJSON('not json')).toBeNull();
    expect(toJSON({})).toBeNull();
  });

  it('parses JSON null as null (valid JSON)', () => {
    expect(toJSON('null')).toBeNull();
  });
});
