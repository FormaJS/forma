import { describe, it, expect } from 'vitest';
import { iso7064Mod11_10CheckDigit } from '../../src/utils/algorithms/iso7064.js';
import { calculateMod11 } from '../../src/utils/algorithms/mod11.js';

describe('algorithms - iso7064 & mod11', () => {
  describe('iso7064Mod11_10CheckDigit', () => {
    it('calcula dígito esperado para sequência válida', () => {
      expect(iso7064Mod11_10CheckDigit('12345678')).toBe(8);
    });

    it('retorna NaN para entrada não numérica', () => {
      expect(Number.isNaN(iso7064Mod11_10CheckDigit('ABC'))).toBe(true);
    });
  });

  describe('calculateMod11', () => {
    it('valida sequência correta (2 dígitos de verificação)', () => {
      const base = '1234567';
      function generate(value, digits, startWeight, maxWeight) {
        let currentBase = value;
        let expected = '';
        for (let i = 0; i < digits; i++) {
          let sum = 0;
          let weight = startWeight;
          for (let j = currentBase.length - 1; j >= 0; j--) {
            const digit = parseInt(currentBase.charAt(j), 10);
            weight = weight > maxWeight ? startWeight : weight;
            sum += digit * weight;
            weight++;
          }
          const remainder = sum % 11;
          const dv = remainder < 2 ? 0 : 11 - remainder;
          expected += String(dv);
          currentBase += String(dv);
        }
        return value + expected;
      }
      const full = generate(base, 2, 2, 9);
      expect(calculateMod11(full, 2, 2, 9)).toBe(true);
    });

    it('retorna false para entrada inválida', () => {
      expect(calculateMod11('ABC123', 2, 2, 9)).toBe(false);
    });

    it('retorna false quando value é curto demais', () => {
      expect(calculateMod11('12', 2, 2, 9)).toBe(false);
    });
  });
});
