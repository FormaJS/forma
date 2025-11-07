import { describe, it, expect } from 'vitest';
import { padStart } from '../../../src/sanitizers/padStart/index.js';

describe('padStart', () => {
  it('should pad the string to the specified length with default space', () => {
    const result = padStart('hello', { length: 10 });
    expect(result).toBe('     hello');
  });

  it('should pad the string with a custom character', () => {
    const result = padStart('hello', { length: 10, char: '*' });
    expect(result).toBe('*****hello');
  });

  it('should return the original string if length is not provided', () => {
    const result = padStart('hello', {});
    expect(result).toBe('hello');
  });

  it('should return the original string if length is null', () => {
    const result = padStart('hello', { length: null });
    expect(result).toBe('hello');
  });

  it('should return the original string if it is already at or above the target length', () => {
    const result = padStart('hello world', { length: 5 });
    expect(result).toBe('hello world');
  });

  it('should handle empty string', () => {
    const result = padStart('', { length: 5 });
    expect(result).toBe('     ');
  });

  it('should handle non-string input by converting to string', () => {
    const result = padStart(123, { length: 5 });
    expect(result).toBe('  123');
  });
});
