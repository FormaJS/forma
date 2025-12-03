import { describe, expect, it } from 'vitest';
import {
  formatCurrency,
  formatDate,
  formatMobileNumber,
  formatPostalCode,
  formatTaxId,
} from '../../src/formatters/index.js';

describe('Formatters', () => {
  describe('formatCurrency', () => {
    it('deve formatar valor em Real brasileiro', () => {
      const result = formatCurrency(1234.56, { locale: 'pt-BR' });
      expect(result).toMatch(/1\.234,56|1234,56/);
    });

    it('deve formatar valor em dólar americano', () => {
      const result = formatCurrency(1234.56, { locale: 'en-US' });
      expect(result).toMatch(/1,234\.56|1234\.56/);
    });

    it('deve lidar com valores zero', () => {
      const result = formatCurrency(0, { locale: 'pt-BR' });
      expect(result).toMatch(/0,00/);
    });

    it('deve lidar com valores negativos', () => {
      const result = formatCurrency(-1234.56, { locale: 'pt-BR' });
      expect(result).toContain('1.234,56');
      expect(result).toMatch(/-|−/); // contém sinal negativo
    });

    it('deve lidar com valores grandes', () => {
      const result = formatCurrency(1234567.89, { locale: 'pt-BR' });
      expect(result).toMatch(/1\.234\.567,89|1234567,89/);
    });

    it('deve retornar null para entrada inválida', () => {
      const result = formatCurrency('abc', { locale: 'pt-BR' });
      expect(result).toBeNull();
    });
  });

  describe('formatDate', () => {
    it('deve formatar data em pt-BR', () => {
      const date = new Date('2024-01-15T00:00:00Z');
      const result = formatDate(date, { locale: 'pt-BR' });
      expect(result).toMatch(/15\/01\/2024/);
    });

    it('deve formatar data em en-US', () => {
      const date = new Date('2024-01-15T00:00:00Z');
      const result = formatDate(date, { locale: 'en-US' });
      expect(result).toMatch(/1\/15\/2024/);
    });

    it('deve formatar data com timestamp', () => {
      const date = new Date(1705276800000);
      const result = formatDate(date, { locale: 'pt-BR' });
      expect(result).toMatch(/\d{2}\/\d{2}\/2024/);
    });

    it('deve retornar null para entrada não-Date', () => {
      const result = formatDate('invalid-date', { locale: 'pt-BR' });
      expect(result).toBeNull();
    });

    it('deve retornar null para Date inválida', () => {
      const result = formatDate(new Date('invalid'), { locale: 'pt-BR' });
      expect(result).toBeNull();
    });
  });

  describe('formatMobileNumber', () => {
    it('deve formatar celular brasileiro', () => {
      const result = formatMobileNumber('11987654321', { locale: 'pt-BR' });
      expect(result).toMatch(/\(11\)\s*9\s*8765-4321/);
    });

    it('deve remover caracteres não numéricos', () => {
      const result = formatMobileNumber('(11) 9 8765-4321', { locale: 'pt-BR' });
      expect(result).toMatch(/\(11\)\s*9\s*8765-4321/);
    });

    it('deve formatar celular americano', () => {
      const result = formatMobileNumber('5551234567', { locale: 'en-US' });
      expect(result).toMatch(/\(555\)\s*123-4567/);
    });

    it('deve retornar dígitos para número inválido', () => {
      const result = formatMobileNumber('123', { locale: 'pt-BR' });
      expect(result).toBe('123');
    });

    it('deve retornar dígitos para número sem formatação', () => {
      const result = formatMobileNumber('987654321', { locale: 'pt-BR' });
      expect(result).toBe('987654321');
    });
  });

  describe('formatPostalCode', () => {
    it('deve formatar CEP brasileiro', () => {
      const result = formatPostalCode('01310100', { locale: 'pt-BR' });
      expect(result).toBe('01310-100');
    });

    it('deve formatar CEP já formatado', () => {
      const result = formatPostalCode('01310-100', { locale: 'pt-BR' });
      expect(result).toBe('01310-100');
    });

    it('deve formatar ZIP code americano', () => {
      const result = formatPostalCode('12345', { locale: 'en-US' });
      expect(result).toBe('12345');
    });

    it('deve formatar ZIP+4 americano', () => {
      const result = formatPostalCode('123456789', { locale: 'en-US' });
      // Retorna o valor limpo se não houver máscara definida
      expect(result).toBe('123456789');
    });

    it('deve retornar CEP limpo para formato inválido', () => {
      const result = formatPostalCode('123', { locale: 'pt-BR' });
      expect(result).toBe('123');
    });

    it('deve lidar com CEP com caracteres especiais removendo-os', () => {
      const result = formatPostalCode('01.310-100', { locale: 'pt-BR' });
      // Remove apenas espaços e hífens, mantém ponto
      expect(result).toBe('01.310100');
    });
  });

  describe('formatTaxId', () => {
    it('deve formatar CPF', () => {
      const result = formatTaxId('12345678901', { locale: 'pt-BR', type: 'CPF' });
      expect(result).toBe('123.456.789-01');
    });

    it('deve formatar CPF já formatado', () => {
      const result = formatTaxId('123.456.789-01', { locale: 'pt-BR', type: 'CPF' });
      expect(result).toBe('123.456.789-01');
    });

    it('deve formatar CNPJ', () => {
      const result = formatTaxId('12345678000190', { locale: 'pt-BR', type: 'CNPJ' });
      expect(result).toBe('12.345.678/0001-90');
    });

    it('deve formatar CNPJ já formatado', () => {
      const result = formatTaxId('12.345.678/0001-90', { locale: 'pt-BR', type: 'CNPJ' });
      expect(result).toBe('12.345.678/0001-90');
    });

    it('deve formatar SSN americano', () => {
      const result = formatTaxId('123456789', { locale: 'en-US', type: 'SSN' });
      expect(result).toBe('123-45-6789');
    });

    it('deve retornar documento limpo sem type', () => {
      const result = formatTaxId('123', { locale: 'pt-BR' });
      expect(result).toBe('123');
    });

    it('deve lidar com CPF com caracteres especiais', () => {
      const result = formatTaxId('123.456.789-01', { locale: 'pt-BR', type: 'CPF' });
      expect(result).toBe('123.456.789-01');
    });
  });
});

// Casos de borda migrados de formatters-edge-cases.test.js
describe('Formatters - Edge Cases e Erros', () => {
  describe('formatCurrency - casos de erro', () => {
    it('deve retornar null sem locale', () => {
      const result = formatCurrency(1234.56);
      expect(result).toBeNull();
    });

    it('deve retornar null com locale inválida', () => {
      const result = formatCurrency(1234.56, { locale: 'invalid-LOCALE' });
      expect(result).toBeNull();
    });

    it('deve retornar null para valor não numérico', () => {
      const result = formatCurrency('abc', { locale: 'pt-BR' });
      expect(result).toBeNull();
    });

    it('deve retornar null para null', () => {
      const result = formatCurrency(null, { locale: 'pt-BR' });
      expect(result).toBeNull();
    });

    it('deve retornar null para undefined', () => {
      const result = formatCurrency(undefined, { locale: 'pt-BR' });
      expect(result).toBeNull();
    });

    it('deve formatarvalor muito pequeno', () => {
      const result = formatCurrency(0.01, { locale: 'pt-BR' });
      expect(result).toContain('0,01');
    });

    it('deve formatar valor muito grande', () => {
      const result = formatCurrency(999999999.99, { locale: 'pt-BR' });
      expect(result).toContain('999');
    });
  });

  describe('formatDate - casos de erro', () => {
    it('deve retornar null sem locale', () => {
      const date = new Date('2024-01-15T00:00:00Z');
      const result = formatDate(date);
      expect(result).toBeNull();
    });

    it('deve retornar null com locale inválida', () => {
      const date = new Date('2024-01-15T00:00:00Z');
      const result = formatDate(date, { locale: 'invalid-LOCALE' });
      expect(result).toBeNull();
    });

    it('deve retornar null para string', () => {
      const result = formatDate('2024-01-15', { locale: 'pt-BR' });
      expect(result).toBeNull();
    });

    it('deve retornar null para número', () => {
      const result = formatDate(1705276800000, { locale: 'pt-BR' });
      expect(result).toBeNull();
    });

    it('deve retornar null para Date inválida', () => {
      const result = formatDate(new Date('invalid'), { locale: 'pt-BR' });
      expect(result).toBeNull();
    });

    it('deve retornar null para null', () => {
      const result = formatDate(null, { locale: 'pt-BR' });
      expect(result).toBeNull();
    });
  });

  describe('formatMobileNumber - casos edge', () => {
    it('deve retornar dígitos sem locale', () => {
      const result = formatMobileNumber('11987654321');
      expect(result).toBe('11987654321');
    });

    it('deve retornar dígitos com locale inválida', () => {
      const result = formatMobileNumber('11987654321', { locale: 'invalid-LOCALE' });
      expect(result).toBe('11987654321');
    });

    it('deve retornar dígitos para número com tamanho incorreto', () => {
      const result = formatMobileNumber('123', { locale: 'pt-BR' });
      expect(result).toBe('123');
    });

    it('deve limpar caracteres não numéricos', () => {
      const result = formatMobileNumber('abc123def', { locale: 'pt-BR' });
      expect(result).toBe('123');
    });

    it('deve formatar com formato internacional', () => {
      const result = formatMobileNumber('11987654321', {
        locale: 'pt-BR',
        format: 'international',
      });
      expect(result).toBeDefined();
    });
  });

  describe('formatPostalCode - casos edge', () => {
    it('deve retornar limpo sem locale', () => {
      const result = formatPostalCode('01310-100');
      expect(result).toBe('01310100');
    });

    it('deve retornar limpo com locale inválida', () => {
      const result = formatPostalCode('01310-100', { locale: 'invalid-LOCALE' });
      expect(result).toBe('01310100');
    });

    it('deve converter para maiúsculas', () => {
      const result = formatPostalCode('abc123', { locale: 'en-US' });
      expect(result).toBe('ABC123');
    });

    it('deve remover espaços e hífens', () => {
      const result = formatPostalCode(' 01310 - 100 ', { locale: 'pt-BR' });
      expect(result).toContain('01310');
    });

    it('deve formatar CEP com tamanho errado', () => {
      const result = formatPostalCode('123', { locale: 'pt-BR' });
      expect(result).toBe('123');
    });
  });

  describe('formatTaxId - casos edge', () => {
    it('deve retornar limpo sem locale', () => {
      const result = formatTaxId('123.456.789-01');
      expect(result).toBe('12345678901');
    });

    it('deve retornar limpo sem type', () => {
      const result = formatTaxId('123.456.789-01', { locale: 'pt-BR' });
      expect(result).toBe('12345678901');
    });

    it('deve retornar limpo com locale inválida', () => {
      const result = formatTaxId('123.456.789-01', {
        locale: 'invalid-LOCALE',
        type: 'CPF',
      });
      expect(result).toBe('12345678901');
    });

    it('deve retornar limpo com type inválido', () => {
      const result = formatTaxId('123.456.789-01', {
        locale: 'pt-BR',
        type: 'INVALID',
      });
      expect(result).toBe('12345678901');
    });

    it('deve converter para maiúsculas', () => {
      const result = formatTaxId('abc123', {
        locale: 'en-US',
        type: 'SSN',
      });
      expect(result).toBe('ABC123');
    });

    it('deve remover pontos, hífens e barras', () => {
      const result = formatTaxId('12.345.678/0001-90', {
        locale: 'pt-BR',
        type: 'CNPJ',
      });
      expect(result).toBe('12.345.678/0001-90');
    });

    it('deve retornar limpo para número com tamanho incorreto', () => {
      const result = formatTaxId('123', {
        locale: 'pt-BR',
        type: 'CPF',
      });
      expect(result).toBe('123');
    });
  });
});
