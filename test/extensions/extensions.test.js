import { describe, expect, it, beforeEach } from 'vitest';
import { addExtension, getExtensions, extensions } from '../../src/extensions/index.js';

describe('Extensions', () => {
  beforeEach(() => {
    // Limpar extensões antes de cada teste
    extensions.length = 0;
  });

  describe('addExtension', () => {
    it('deve adicionar uma extensão válida', () => {
      const extension = () => {};
      addExtension(extension);
      expect(extensions).toContain(extension);
    });

    it('deve adicionar múltiplas extensões', () => {
      const ext1 = () => {};
      const ext2 = () => {};
      addExtension(ext1);
      addExtension(ext2);
      expect(extensions).toHaveLength(2);
      expect(extensions).toContain(ext1);
      expect(extensions).toContain(ext2);
    });

    it('deve lançar erro para extensão que não é função', () => {
      expect(() => addExtension('not a function')).toThrow('Extension must be a function');
    });

    it('deve lançar erro para extensão null', () => {
      expect(() => addExtension(null)).toThrow('Extension must be a function');
    });

    it('deve lançar erro para extensão undefined', () => {
      expect(() => addExtension(undefined)).toThrow('Extension must be a function');
    });

    it('deve lançar erro para objeto', () => {
      expect(() => addExtension({})).toThrow('Extension must be a function');
    });

    it('deve lançar erro para array', () => {
      expect(() => addExtension([])).toThrow('Extension must be a function');
    });
  });

  describe('getExtensions', () => {
    it('deve retornar array vazio inicialmente', () => {
      const result = getExtensions();
      expect(result).toEqual([]);
    });

    it('deve retornar extensões adicionadas', () => {
      const ext1 = () => {};
      const ext2 = () => {};
      addExtension(ext1);
      addExtension(ext2);
      const result = getExtensions();
      expect(result).toHaveLength(2);
      expect(result).toContain(ext1);
      expect(result).toContain(ext2);
    });

    it('deve retornar o mesmo array de extensões', () => {
      const ext = () => {};
      addExtension(ext);
      const result1 = getExtensions();
      const result2 = getExtensions();
      expect(result1).toBe(result2);
    });
  });

  describe('extensions array', () => {
    it('deve ser exportado e acessível', () => {
      expect(extensions).toBeDefined();
      expect(Array.isArray(extensions)).toBe(true);
    });

    it('deve refletir mudanças via addExtension', () => {
      const ext = () => {};
      expect(extensions).toHaveLength(0);
      addExtension(ext);
      expect(extensions).toHaveLength(1);
    });
  });
});
