import { describe, it, expect } from 'vitest';
import { onlyFallback } from '../../src/validators/onlyFallback/index.js';

describe('onlyFallback', () => {
  it('retorna true', () => {
    expect(onlyFallback()).toBe(true);
  });
});
