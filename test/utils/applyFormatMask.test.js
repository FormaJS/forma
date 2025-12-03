import { describe, it, expect } from 'vitest';
import { applyFormatMask } from '../../src/utils/applyFormatMask/index.js';

describe('applyFormatMask', () => {
  describe('digit placeholder (#)', () => {
    it('should format digits only', () => {
      expect(applyFormatMask('09010140', '#####-###')).toBe('09010-140');
      expect(applyFormatMask('12345678', '####-####')).toBe('1234-5678');
    });

    it('should skip non-digit characters', () => {
      expect(applyFormatMask('090a10b140', '#####-###')).toBe('09010-140');
      expect(applyFormatMask('1-2-3-4-5', '#####')).toBe('12345');
    });

    it('should stop when input exhausted', () => {
      expect(applyFormatMask('123', '#####-###')).toBe('123');
      expect(applyFormatMask('12345', '#####-###')).toBe('12345');
    });
  });

  describe('uppercase letter placeholder (A)', () => {
    it('should format uppercase letters', () => {
      expect(applyFormatMask('ABC', 'AA-A')).toBe('AB-C');
      expect(applyFormatMask('XYZ', 'AAA')).toBe('XYZ');
    });

    it('should convert lowercase to uppercase', () => {
      expect(applyFormatMask('abc', 'AA-A')).toBe('AB-C');
      expect(applyFormatMask('AbC', 'AAA')).toBe('ABC');
    });

    it('should skip non-letter characters', () => {
      expect(applyFormatMask('A1B2C', 'AA-A')).toBe('AB-C');
      expect(applyFormatMask('A-B-C', 'AAA')).toBe('ABC');
    });
  });

  describe('lowercase letter placeholder (a)', () => {
    it('should format lowercase letters', () => {
      expect(applyFormatMask('abc', 'aa-a')).toBe('ab-c');
    });

    it('should convert uppercase to lowercase', () => {
      expect(applyFormatMask('ABC', 'aa-a')).toBe('ab-c');
      expect(applyFormatMask('AbC', 'aaa')).toBe('abc');
    });

    it('should skip non-letter characters', () => {
      expect(applyFormatMask('a1b2c', 'aa-a')).toBe('ab-c');
    });
  });

  describe('alphanumeric placeholder (*)', () => {
    it('should format alphanumeric characters', () => {
      expect(applyFormatMask('A1B2C3', '***-***')).toBe('A1B-2C3');
      expect(applyFormatMask('ABC123', '******')).toBe('ABC123');
    });

    it('should skip special characters', () => {
      expect(applyFormatMask('A-1-B', '***')).toBe('A1B');
      expect(applyFormatMask('!@#$ABC', '***')).toBe('ABC');
    });

    it('should preserve case', () => {
      expect(applyFormatMask('Ab1', '***')).toBe('Ab1');
    });
  });

  describe('mixed placeholders', () => {
    it('should handle UK postal codes', () => {
      expect(applyFormatMask('SW1A1AA', 'AA** *AA')).toBe('SW1A 1AA');
      expect(applyFormatMask('M11AE', 'A#* *AA')).toBe('M11 AE');
    });

    it('should handle Canadian postal codes', () => {
      expect(applyFormatMask('K1A0B1', 'A#A #A#')).toBe('K1A 0B1');
      expect(applyFormatMask('H2X1Y4', 'A#A #A#')).toBe('H2X 1Y4');
    });

    it('should handle UK National Insurance numbers', () => {
      expect(applyFormatMask('AB123456C', 'AA ## ## ## A')).toBe('AB 12 34 56 C');
      expect(applyFormatMask('QQ123456A', 'AA ## ## ## A')).toBe('QQ 12 34 56 A');
    });

    it('should handle Spanish DNI', () => {
      expect(applyFormatMask('12345678Z', '########A')).toBe('12345678Z');
    });

    it('should handle Mexican RFC', () => {
      expect(applyFormatMask('ABCD123456EF1', 'AAAA######***')).toBe('ABCD123456EF1');
    });

    it('should handle Argentinian postal codes', () => {
      expect(applyFormatMask('C1234ABC', 'A####AAA')).toBe('C1234ABC');
    });
  });

  describe('literal characters', () => {
    it('should include literals in output', () => {
      expect(applyFormatMask('123456', '###-###')).toBe('123-456');
      expect(applyFormatMask('ABCD', 'AA/AA')).toBe('AB/CD');
      expect(applyFormatMask('123', '(###)')).toBe('(123)');
    });

    it('should handle multiple literals', () => {
      expect(applyFormatMask('1234567890', '(###) ###-####')).toBe('(123) 456-7890');
      expect(applyFormatMask('12345678', '####.####')).toBe('1234.5678');
    });
  });

  describe('normalize option', () => {
    it('should normalize accented characters when enabled', () => {
      expect(applyFormatMask('ÃÇÔ', 'AAA', { normalize: true })).toBe('ACO');
      expect(applyFormatMask('Québec', 'AAAAAA', { normalize: true })).toBe('QUEBEC');
    });

    it('should not normalize when disabled', () => {
      expect(applyFormatMask('ÃÇÔ', 'AAA', { normalize: false })).toBe('ÃÇÔ');
    });

    it('should not normalize by default', () => {
      expect(applyFormatMask('ÃÇÔ', 'AAA')).toBe('ÃÇÔ');
    });
  });

  describe('edge cases', () => {
    it('should handle empty input', () => {
      expect(applyFormatMask('', '#####')).toBe('');
    });

    it('should handle empty mask', () => {
      expect(applyFormatMask('12345', '')).toBe('');
    });

    it('should handle input longer than mask', () => {
      expect(applyFormatMask('1234567890', '#####')).toBe('12345');
    });

    it('should handle all literals mask', () => {
      expect(applyFormatMask('123', '---')).toBe('---');
    });
  });
});
