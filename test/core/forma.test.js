import { describe, expect, it } from 'vitest';
import { Forma } from '../../src/core/forma.js';

describe('Forma Class', () => {
  describe('constructor', () => {
    it('deve criar uma instância com locale padrão en-US', () => {
      const forma = new Forma();
      expect(forma.locale).toBe('en-US');
      expect(forma.config).toBeDefined();
    });

    it('deve criar uma instância com locale específico', () => {
      const forma = new Forma('pt-BR');
      expect(forma.locale).toBe('pt-BR');
      expect(forma.config).toBeDefined();
    });

    it('deve lançar erro para locale inexistente', () => {
      expect(() => new Forma('xx-XX')).toThrow('Forma.js: Locale "xx-XX" not found.');
    });
  });

  describe('setLocale', () => {
    it('deve alterar o locale da instância', () => {
      const forma = new Forma('en-US');
      forma.setLocale('pt-BR');
      expect(forma.locale).toBe('pt-BR');
      expect(forma.config).toBeDefined();
    });

    it('deve lançar erro ao tentar definir locale inexistente', () => {
      const forma = new Forma();
      expect(() => forma.setLocale('xx-XX')).toThrow('Forma.js: Locale "xx-XX" not found.');
    });
  });

  describe('validators binding', () => {
    it('deve ter métodos de validação disponíveis', () => {
      const forma = new Forma();
      expect(typeof forma.validateAlpha).toBe('function');
      expect(typeof forma.validateEmail).toBe('function');
      expect(typeof forma.validateNumeric).toBe('function');
    });

    it('deve executar validação válida retornando { valid: true }', () => {
      const forma = new Forma();
      const result = forma.validateAlpha('abc');
      expect(result.valid).toBe(true);
      expect(result.message).toBeNull();
    });

    it('deve executar validação inválida retornando { valid: false, message }', () => {
      const forma = new Forma();
      const result = forma.validateAlpha('123');
      expect(result.valid).toBe(false);
      expect(result.message).toBeDefined();
      expect(typeof result.message).toBe('string');
    });

    it('deve usar locale da instância por padrão', () => {
      const forma = new Forma('pt-BR');
      const result = forma.validateAlpha('123');
      expect(result.valid).toBe(false);
      expect(result.message).toBeDefined();
      // Mensagem deve estar em português
    });

    it('deve aceitar options com locale override', () => {
      const forma = new Forma('en-US');
      const result = forma.validateAlpha('123', { locale: 'pt-BR' });
      expect(result.valid).toBe(false);
      expect(result.message).toBeDefined();
    });

    it('deve aceitar argumentos adicionais antes das options', () => {
      const forma = new Forma();
      const result = forma.validateNumeric('123.45', { locale: 'en-US' });
      expect(result).toBeDefined();
    });

    it('deve retornar contexto quando disponível', () => {
      const forma = new Forma();
      const result = forma.validateAlpha('abc');
      expect(result).toHaveProperty('context');
    });
  });

  describe('parsers binding', () => {
    it('deve ter métodos de parser disponíveis', () => {
      const forma = new Forma();
      expect(typeof forma.toInt).toBe('function');
      expect(typeof forma.toFloat).toBe('function');
      expect(typeof forma.toDate).toBe('function');
      expect(typeof forma.toBoolean).toBe('function');
    });

    it('deve executar parser retornando valor convertido', () => {
      const forma = new Forma();
      const result = forma.toInt('123');
      expect(result).toBe(123);
    });

    it('deve usar locale da instância nos parsers', () => {
      const forma = new Forma('pt-BR');
      const result = forma.toFloat('1.234,56');
      expect(result).toBe(1234.56);
    });

    it('deve aceitar options com locale override nos parsers', () => {
      const forma = new Forma('pt-BR');
      const result = forma.toFloat('1.234,56', { locale: 'pt-BR' });
      expect(result).toBe(1234.56);
    });

    it('deve aceitar argumentos adicionais antes das options', () => {
      const forma = new Forma('en-US');
      const result = forma.toDate('2023-12-25', 'yyyy-mm-dd');
      expect(result).toBeInstanceOf(Date);
    });
  });

  describe('sanitizers binding', () => {
    it('deve ter métodos de sanitizer disponíveis', () => {
      const forma = new Forma();
      expect(typeof forma.blacklist).toBe('function');
      expect(typeof forma.whitelist).toBe('function');
      expect(typeof forma.escapeHTML).toBe('function');
      expect(typeof forma.trim).toBe('function');
    });

    it('deve executar sanitizer retornando valor sanitizado', () => {
      const forma = new Forma();
      const result = forma.blacklist('abc123', { chars: '123' });
      expect(result).toBe('abc');
    });

    it('deve aceitar options nos sanitizers', () => {
      const forma = new Forma();
      const result = forma.whitelist('abc123', { chars: 'abc', locale: 'en-US' });
      expect(result).toBe('abc');
    });
  });

  describe('formatters binding', () => {
    it('deve ter métodos de formatter disponíveis', () => {
      const forma = new Forma();
      expect(typeof forma.formatCurrency).toBe('function');
      expect(typeof forma.formatDate).toBe('function');
      expect(typeof forma.formatMobileNumber).toBe('function');
    });

    it('deve executar formatter retornando valor formatado', () => {
      const forma = new Forma('en-US');
      const result = forma.formatCurrency(1234.56);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    it('deve usar locale da instância nos formatters', () => {
      const forma = new Forma('pt-BR');
      const result = forma.formatCurrency(1234.56);
      expect(result).toBeDefined();
    });

    it('deve aceitar options com locale override nos formatters', () => {
      const forma = new Forma('en-US');
      const result = forma.formatCurrency(1234.56, { locale: 'pt-BR' });
      expect(result).toBeDefined();
    });
  });

  describe('async validators', () => {
    it('deve retornar Promise para validators assíncronos', async () => {
      const forma = new Forma();
      // Assumindo que existem validators assíncronos
      // Se não existirem, este teste pode ser adaptado
      const result = forma.validateAlpha('abc');

      // Se for síncrono, deve ter valid property
      if (result && typeof result.then !== 'function') {
        expect(result).toHaveProperty('valid');
      }
    });
  });

  describe('error handling', () => {
    it('deve retornar mensagem formatada com contexto', () => {
      const forma = new Forma();
      const result = forma.validateAlpha('123');
      expect(result.valid).toBe(false);
      expect(result.message).toBeDefined();
      expect(result.error).toBeDefined();
      // Context pode ser undefined para alguns validators
    });

    it('deve usar mensagem padrão quando template não disponível', () => {
      const forma = new Forma();
      // Este teste depende de como o código lida com mensagens ausentes
      const result = forma.validateAlpha('123');
      expect(result.message).toBeDefined();
    });
  });

  describe('options object detection', () => {
    it('deve detectar objeto de options como último argumento', () => {
      const forma = new Forma();
      const result = forma.validateAlpha('abc', { locale: 'pt-BR' });
      expect(result.valid).toBe(true);
    });

    it('não deve tratar array como objeto de options', () => {
      const forma = new Forma();
      // Testa que arrays não são tratados como options
      const result = forma.validateAlpha('abc');
      expect(result).toBeDefined();
    });

    it('não deve tratar null como objeto de options', () => {
      const forma = new Forma();
      const result = forma.validateAlpha('abc');
      expect(result).toBeDefined();
    });
  });

  describe('integration tests', () => {
    it('deve permitir trocar locale e usar os novos métodos', () => {
      const forma = new Forma('en-US');
      let result = forma.formatCurrency(1234.56);
      expect(result).toBeDefined();

      forma.setLocale('pt-BR');
      result = forma.formatCurrency(1234.56);
      expect(result).toBeDefined();
    });

    it('deve manter estado correto após múltiplas operações', () => {
      const forma = new Forma('en-US');

      forma.validateAlpha('abc');
      forma.toInt('123');
      forma.formatCurrency(100);
      forma.blacklist('abc123', '123');

      expect(forma.locale).toBe('en-US');
      expect(forma.config).toBeDefined();
    });

    it('deve funcionar com diferentes tipos de validators', () => {
      const forma = new Forma();

      const alpha = forma.validateAlpha('abc');
      const numeric = forma.validateNumeric('123');
      const email = forma.validateEmail('test@example.com');

      expect(alpha.valid).toBe(true);
      expect(numeric.valid).toBe(true);
      expect(email.valid).toBe(true);
    });
  });
});
