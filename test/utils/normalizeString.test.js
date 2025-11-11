import { describe, it, expect } from 'vitest';
import { normalizeString } from '../../src/utils/normalizeString/index.js';

describe('normalizeString', () => {
  it('should remove accents from characters', () => {
    expect(normalizeString('São Paulo')).toBe('Sao Paulo');
    expect(normalizeString('Montréal')).toBe('Montreal');
    expect(normalizeString('Québec')).toBe('Quebec');
    expect(normalizeString('München')).toBe('Munchen');
    expect(normalizeString('Málaga')).toBe('Malaga');
  });

  it('should handle strings without accents', () => {
    expect(normalizeString('London')).toBe('London');
    expect(normalizeString('New York')).toBe('New York');
    expect(normalizeString('Tokyo')).toBe('Tokyo');
  });

  it('should preserve case', () => {
    expect(normalizeString('CAFÉ')).toBe('CAFE');
    expect(normalizeString('café')).toBe('cafe');
    expect(normalizeString('Café')).toBe('Cafe');
  });

  it('should handle mixed content', () => {
    expect(normalizeString('Ñoño123')).toBe('Nono123');
    expect(normalizeString('Übër-cool!')).toBe('Uber-cool!');
  });

  it('should handle empty strings', () => {
    expect(normalizeString('')).toBe('');
  });

  it('should handle various diacritics', () => {
    expect(normalizeString('àáâãäå')).toBe('aaaaaa');
    expect(normalizeString('èéêë')).toBe('eeee');
    expect(normalizeString('ìíîï')).toBe('iiii');
    expect(normalizeString('òóôõö')).toBe('ooooo');
    expect(normalizeString('ùúûü')).toBe('uuuu');
    expect(normalizeString('ýÿ')).toBe('yy');
    expect(normalizeString('ñ')).toBe('n');
    expect(normalizeString('ç')).toBe('c');
  });
});
