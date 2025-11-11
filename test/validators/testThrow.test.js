import { describe, it, expect } from 'vitest';
import testThrow from '../../src/validators/testThrow/index.js';

describe('testThrow', () => {
  it('lança erro esperado', () => {
    expect(() => testThrow()).toThrowError('test-throw');
  });
});
