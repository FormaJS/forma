import { describe, expect, it } from 'vitest';
import formaDefaultExport, * as formaModule from '../../src/index.js';

describe('Main Index Exports', () => {
  describe('default export', () => {
    it('deve exportar uma instância pré-configurada do Forma', () => {
      expect(formaDefaultExport).toBeDefined();
      expect(formaDefaultExport.locale).toBe('en-US');
    });

    it('deve ter métodos de validação disponíveis', () => {
      expect(typeof formaDefaultExport.validateAlpha).toBe('function');
      expect(typeof formaDefaultExport.validateEmail).toBe('function');
    });

    it('deve ter métodos de parser disponíveis', () => {
      expect(typeof formaDefaultExport.toInt).toBe('function');
      expect(typeof formaDefaultExport.toFloat).toBe('function');
    });

    it('deve ter métodos de sanitizer disponíveis', () => {
      expect(typeof formaDefaultExport.blacklist).toBe('function');
      expect(typeof formaDefaultExport.trim).toBe('function');
    });

    it('deve ter métodos de formatter disponíveis', () => {
      expect(typeof formaDefaultExport.formatCurrency).toBe('function');
      expect(typeof formaDefaultExport.formatDate).toBe('function');
    });
  });

  describe('named exports', () => {
    it('deve exportar a classe Forma', () => {
      expect(formaModule.Forma).toBeDefined();
      expect(typeof formaModule.Forma).toBe('function');
    });

    it('deve exportar forma como instância pré-configurada', () => {
      expect(formaModule.forma).toBeDefined();
      expect(formaModule.forma.locale).toBe('en-US');
    });

    it('deve exportar locales', () => {
      expect(formaModule.locales).toBeDefined();
      expect(typeof formaModule.locales).toBe('object');
      expect(Object.keys(formaModule.locales).length).toBeGreaterThan(0);
    });
  });

  describe('validators exports', () => {
    it('deve exportar validateAlpha', () => {
      expect(formaModule.validateAlpha).toBeDefined();
      expect(typeof formaModule.validateAlpha).toBe('function');
    });

    it('deve exportar validateEmail', () => {
      expect(formaModule.validateEmail).toBeDefined();
      expect(typeof formaModule.validateEmail).toBe('function');
    });

    it('deve exportar validateNumeric', () => {
      expect(formaModule.validateNumeric).toBeDefined();
      expect(typeof formaModule.validateNumeric).toBe('function');
    });
  });

  describe('parsers exports', () => {
    it('deve exportar toInt', () => {
      expect(formaModule.toInt).toBeDefined();
      expect(typeof formaModule.toInt).toBe('function');
    });

    it('deve exportar toFloat', () => {
      expect(formaModule.toFloat).toBeDefined();
      expect(typeof formaModule.toFloat).toBe('function');
    });

    it('deve exportar toDate', () => {
      expect(formaModule.toDate).toBeDefined();
      expect(typeof formaModule.toDate).toBe('function');
    });

    it('deve exportar toBoolean', () => {
      expect(formaModule.toBoolean).toBeDefined();
      expect(typeof formaModule.toBoolean).toBe('function');
    });
  });

  describe('sanitizers exports', () => {
    it('deve exportar blacklist', () => {
      expect(formaModule.blacklist).toBeDefined();
      expect(typeof formaModule.blacklist).toBe('function');
    });

    it('deve exportar whitelist', () => {
      expect(formaModule.whitelist).toBeDefined();
      expect(typeof formaModule.whitelist).toBe('function');
    });

    it('deve exportar trim', () => {
      expect(formaModule.trim).toBeDefined();
      expect(typeof formaModule.trim).toBe('function');
    });

    it('deve exportar escapeHTML', () => {
      expect(formaModule.escapeHTML).toBeDefined();
      expect(typeof formaModule.escapeHTML).toBe('function');
    });
  });

  describe('i18n exports', () => {
    it('deve exportar getLocaleData', () => {
      expect(formaModule.getLocaleData).toBeDefined();
      expect(typeof formaModule.getLocaleData).toBe('function');
    });
  });

  describe('functional tests', () => {
    it('instância pré-configurada deve validar corretamente', () => {
      const result = formaDefaultExport.validateAlpha('abc');
      expect(result.valid).toBe(true);
    });

    it('deve ser possível criar nova instância com a classe exportada', () => {
      const customForma = new formaModule.Forma('pt-BR');
      expect(customForma.locale).toBe('pt-BR');
    });

    it('validators exportados devem funcionar diretamente', () => {
      const result = formaModule.validateAlpha('abc', { locale: 'en-US' });
      expect(result.valid).toBe(true);
    });

    it('parsers exportados devem funcionar diretamente', () => {
      const result = formaModule.toInt('123');
      expect(result).toBe(123);
    });

    it('sanitizers exportados devem funcionar diretamente', () => {
      const result = formaModule.trim('  hello  ');
      expect(result).toBe('hello');
    });
  });
});
