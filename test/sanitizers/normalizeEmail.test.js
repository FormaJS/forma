import { describe, it, expect } from 'vitest';
import { normalizeEmail } from '../../src/sanitizers/normalizeEmail/index.js';
import '../setup.js';

describe('normalizeEmail', () => {
  it('lowercases and strips dots/subaddressing for gmail-like domains', () => {
    const input = 'User.Name+tag@gmail.com';
    const out = normalizeEmail(input, { lowercase: true });
    expect(out).toBe('username@gmail.com');
  });

  it('returns unchanged string for invalid emails', () => {
    expect(normalizeEmail('not-an-email')).toBe('not-an-email');
  });

  it('respects options to disable normalization', () => {
    const input = 'User.Name+tag@G.Mail';
    const out = normalizeEmail(input, {
      normalizeDots: false,
      normalizeSubaddressing: false,
      lowercase: false,
    });
    expect(out).toBe('User.Name+tag@G.Mail');
  });
});
