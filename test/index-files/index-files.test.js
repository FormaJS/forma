import { describe, expect, it } from 'vitest';

describe('Index Files - Re-exports', () => {
  describe('parsers/index.js', () => {
    it('deve exportar toBoolean', async () => {
      const module = await import('../../src/parsers/index.js');
      expect(module.toBoolean).toBeDefined();
      expect(typeof module.toBoolean).toBe('function');
    });

    it('deve exportar toDate', async () => {
      const module = await import('../../src/parsers/index.js');
      expect(module.toDate).toBeDefined();
      expect(typeof module.toDate).toBe('function');
    });

    it('deve exportar toFloat', async () => {
      const module = await import('../../src/parsers/index.js');
      expect(module.toFloat).toBeDefined();
      expect(typeof module.toFloat).toBe('function');
    });

    it('deve exportar toInt', async () => {
      const module = await import('../../src/parsers/index.js');
      expect(module.toInt).toBeDefined();
      expect(typeof module.toInt).toBe('function');
    });

    it('deve exportar toJSON', async () => {
      const module = await import('../../src/parsers/index.js');
      expect(module.toJSON).toBeDefined();
      expect(typeof module.toJSON).toBe('function');
    });
  });

  describe('sanitizers/index.js', () => {
    it('deve exportar blacklist', async () => {
      const module = await import('../../src/sanitizers/index.js');
      expect(module.blacklist).toBeDefined();
      expect(typeof module.blacklist).toBe('function');
    });

    it('deve exportar whitelist', async () => {
      const module = await import('../../src/sanitizers/index.js');
      expect(module.whitelist).toBeDefined();
      expect(typeof module.whitelist).toBe('function');
    });

    it('deve exportar escapeHTML', async () => {
      const module = await import('../../src/sanitizers/index.js');
      expect(module.escapeHTML).toBeDefined();
      expect(typeof module.escapeHTML).toBe('function');
    });

    it('deve exportar trim', async () => {
      const module = await import('../../src/sanitizers/index.js');
      expect(module.trim).toBeDefined();
      expect(typeof module.trim).toBe('function');
    });

    it('deve exportar todos os 10 sanitizers', async () => {
      const module = await import('../../src/sanitizers/index.js');
      const exports = Object.keys(module);
      // blacklist, escapeHTML, lTrim, normalizeEmail, rTrim, stripTags, toSlug, trim, unescapeHTML, whitelist
      expect(exports.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe('validators/index.js', () => {
    it('deve exportar validateAlpha', async () => {
      const module = await import('../../src/validators/index.js');
      expect(module.validateAlpha).toBeDefined();
      expect(typeof module.validateAlpha).toBe('function');
    });

    it('deve exportar validateEmail', async () => {
      const module = await import('../../src/validators/index.js');
      expect(module.validateEmail).toBeDefined();
      expect(typeof module.validateEmail).toBe('function');
    });

    it('deve exportar validateNumeric', async () => {
      const module = await import('../../src/validators/index.js');
      expect(module.validateNumeric).toBeDefined();
      expect(typeof module.validateNumeric).toBe('function');
    });

    it('deve exportar validateURL', async () => {
      const module = await import('../../src/validators/index.js');
      expect(module.validateURL).toBeDefined();
      expect(typeof module.validateURL).toBe('function');
    });

    it('deve exportar todos os validators principais', async () => {
      const module = await import('../../src/validators/index.js');
      const exports = Object.keys(module);
      // Deve ter mais de 50 validators
      expect(exports.length).toBeGreaterThanOrEqual(50);
    });
  });
});
