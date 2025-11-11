import { describe, expect, it } from 'vitest';
// Importar do index para garantir cobertura do arquivo index
import {
  blacklist,
  escapeHTML,
  lTrim,
  normalizeEmail,
  rTrim,
  stripTags,
  toSlug,
  trim,
  unescapeHTML,
  whitelist,
} from '../../src/sanitizers/index.js';

describe('Sanitizers - Coverage', () => {
  describe('blacklist', () => {
    it('deve remover caracteres da blacklist', () => {
      const result = blacklist('abc123', { chars: '123' });
      expect(result).toBe('abc');
    });

    it('deve remover palavras da blacklist', () => {
      const result = blacklist('hello bad world', { words: ['bad'] });
      expect(result).toBe('hello  world');
    });

    it('deve substituir com caractere específico', () => {
      const result = blacklist('abc123', { chars: '123', replacementChar: 'X' });
      expect(result).toBe('abcXXX');
    });

    it('deve ser case-insensitive quando strict=false', () => {
      const result = blacklist('Hello WORLD', { words: ['hello', 'world'], strict: false });
      expect(result).toBe(' ');
    });
  });

  describe('whitelist', () => {
    describe('chars whitelist', () => {
      it('keeps only specified characters', () => {
        const result = whitelist('abc123xyz', { chars: 'abc' });
        expect(result).toBe('abc');
      });

      it('removes all characters not in whitelist', () => {
        const result = whitelist('Hello World!', { chars: 'Helo' });
        expect(result).toBe('Hellool');
      });

      it('handles numeric characters', () => {
        const result = whitelist('abc123def456', { chars: '123456789' });
        expect(result).toBe('123456');
      });

      it('handles special regex characters in chars', () => {
        const result = whitelist('a.b*c[d]e', { chars: '.*[]' });
        expect(result).toBe('.*[]');
      });

      it('is case-sensitive by default for chars', () => {
        const result = whitelist('AaBbCc', { chars: 'abc' });
        expect(result).toBe('abc');
      });

      it('is case-insensitive when strict=false for chars', () => {
        const result = whitelist('AaBbCc', { chars: 'abc', strict: false });
        expect(result).toBe('AaBbCc');
      });

      it('handles empty chars string', () => {
        const result = whitelist('test', { chars: '' });
        expect(result).toBe('');
      });
    });

    describe('words whitelist', () => {
      it('keeps only specified words/substrings', () => {
        const result = whitelist('hello world test', { words: ['hello', 'test'] });
        expect(result).toBe('hellotest');
      });

      it('extracts matching substrings and concatenates', () => {
        const result = whitelist('The quick brown fox', { words: ['quick', 'fox'] });
        expect(result).toBe('quickfox');
      });

      it('is case-sensitive by default for words', () => {
        const result = whitelist('Hello hello HELLO', { words: ['hello'] });
        expect(result).toBe('hello');
      });

      it('is case-insensitive when strict=false for words', () => {
        const result = whitelist('Hello hello HELLO', { words: ['hello'], strict: false });
        expect(result).toBe('HellohelloHELLO');
      });

      it('handles overlapping matches', () => {
        const result = whitelist('abcabc', { words: ['abc'] });
        expect(result).toBe('abcabc');
      });

      it('returns empty string when no matches', () => {
        const result = whitelist('test content', { words: ['notfound'] });
        expect(result).toBe('');
      });

      it('handles empty words array', () => {
        const result = whitelist('test', { words: [] });
        expect(result).toBe('');
      });

      it('escapes special regex characters in words', () => {
        const result = whitelist('a.b*c', { words: ['a.b', '*c'] });
        expect(result).toBe('a.b*c');
      });

      it('converts non-string words to string', () => {
        const result = whitelist('test 123 end', { words: [123] });
        expect(result).toBe('123');
      });
    });

    describe('edge cases', () => {
      it('returns empty string when no options provided', () => {
        const result = whitelist('test content');
        expect(result).toBe('');
      });

      it('returns empty string when options is empty object', () => {
        const result = whitelist('test content', {});
        expect(result).toBe('');
      });

      it('converts non-string input to string', () => {
        const result = whitelist(12345, { chars: '123' });
        expect(result).toBe('123');
      });

      it('handles null/undefined input by converting to string', () => {
        expect(whitelist(null, { chars: 'null' })).toBe('');
        expect(whitelist(undefined, { chars: 'undefined' })).toBe('');
      });

      it('prefers chars over words when both provided', () => {
        const result = whitelist('abc123', { chars: 'abc', words: ['123'] });
        expect(result).toBe('abc');
      });
    });
  });

  describe('escapeHTML', () => {
    it('deve escapar HTML', () => {
      const result = escapeHTML('<div>Test</div>');
      expect(result).toBe('&lt;div&gt;Test&lt;/div&gt;');
    });

    it('deve escapar caracteres especiais', () => {
      const result = escapeHTML('Test & "quotes"');
      expect(result).toContain('&amp;');
      expect(result).toContain('&quot;');
    });
  });

  describe('unescapeHTML', () => {
    it('deve desescapar HTML', () => {
      const result = unescapeHTML('&lt;div&gt;Test&lt;/div&gt;');
      expect(result).toBe('<div>Test</div>');
    });

    it('deve desescapar caracteres especiais', () => {
      const result = unescapeHTML('Test &amp; &quot;quotes&quot;');
      expect(result).toBe('Test & "quotes"');
    });
  });

  describe('trim', () => {
    it('deve remover espaços nas extremidades', () => {
      const result = trim('  hello  ');
      expect(result).toBe('hello');
    });

    it('deve remover tabs e newlines', () => {
      const result = trim('\t\nhello\n\t');
      expect(result).toBe('hello');
    });

    it('deve aceitar caracteres customizados para trim', () => {
      const result = trim('xxxhelloxxx', { chars: 'x' });
      expect(result).toBe('hello');
    });
  });

  describe('lTrim', () => {
    it('deve remover espaços à esquerda', () => {
      const result = lTrim('  hello  ');
      expect(result).toBe('hello  ');
    });

    it('deve aceitar caracteres customizados', () => {
      const result = lTrim('xxxhello', { chars: 'x' });
      expect(result).toBe('hello');
    });
  });

  describe('rTrim', () => {
    it('deve remover espaços à direita', () => {
      const result = rTrim('  hello  ');
      expect(result).toBe('  hello');
    });

    it('deve aceitar caracteres customizados', () => {
      const result = rTrim('helloxxx', { chars: 'x' });
      expect(result).toBe('hello');
    });
  });

  describe('stripTags', () => {
    it('removes all HTML tags when no allowTags specified', () => {
      const input = '<p>Hello <strong>world</strong>!</p>';
      const result = stripTags(input);
      expect(result).toBe('Hello world!');
    });

    it('removes all tags from complex nested HTML', () => {
      const input = '<div><span class="test">Text</span><br/></div>';
      const result = stripTags(input);
      expect(result).toBe('Text');
    });

    it('preserves specified tags in allowTags array', () => {
      const input = '<p>Hello <strong>world</strong> <em>test</em>!</p>';
      const result = stripTags(input, { allowTags: ['strong'] });
      expect(result).toBe('Hello <strong>world</strong> test!');
    });

    it('preserves multiple allowed tags', () => {
      const input = '<p>Hello <strong>world</strong> <em>test</em>!</p>';
      const result = stripTags(input, { allowTags: ['strong', 'em'] });
      expect(result).toBe('Hello <strong>world</strong> <em>test</em>!');
    });

    it('handles self-closing tags when preserving', () => {
      const input = 'Text <br/> more <img src="test.png"/> end';
      const result = stripTags(input, { allowTags: ['br'] });
      expect(result).toBe('Text <br/> more  end');
    });

    it('is case-insensitive for tag matching in allowTags', () => {
      const input = '<P>Hello <STRONG>world</STRONG>!</P>';
      const result = stripTags(input, { allowTags: ['strong'] });
      expect(result).toBe('Hello <STRONG>world</STRONG>!');
    });

    it('handles empty string', () => {
      expect(stripTags('')).toBe('');
    });

    it('handles string with no tags', () => {
      expect(stripTags('Plain text')).toBe('Plain text');
    });

    it('returns empty when allowTags is empty array', () => {
      const input = '<p>Test</p>';
      const result = stripTags(input, { allowTags: [] });
      expect(result).toBe('Test');
    });

    it('handles closing tags in allowTags', () => {
      const input = '<div><p>Content</p></div>';
      const result = stripTags(input, { allowTags: ['p'] });
      expect(result).toBe('<p>Content</p>');
    });

    it('converts non-string input to string', () => {
      const result = stripTags(12345);
      expect(result).toBe('12345');
    });

    it('handles tags with attributes', () => {
      const input = '<p class="test" id="main">Text</p>';
      const result = stripTags(input, { allowTags: ['p'] });
      expect(result).toBe('<p class="test" id="main">Text</p>');
    });
  });

  describe('toSlug', () => {
    it('deve converter para slug', () => {
      const result = toSlug('Hello World');
      expect(result).toBe('hello-world');
    });

    it('deve remover caracteres especiais', () => {
      const result = toSlug('Hello, World!');
      expect(result).toBe('hello-world');
    });

    it('deve lidar com acentos', () => {
      const result = toSlug('Olá Mundo');
      expect(result).toBe('ola-mundo');
    });

    it('deve aceitar separador customizado', () => {
      const result = toSlug('Hello World', { separator: '_' });
      expect(result).toBe('hello_world');
    });
  });

  // Novos testes: padStart / padEnd
  describe('padStart', () => {
    it('deve preencher à esquerda até o tamanho alvo', async () => {
      const { padStart } = await import('../../src/sanitizers/padStart/index.js');
      expect(padStart('7', { length: 3, char: '0' })).toBe('007');
    });

    it('deve retornar string original quando length não for fornecido', async () => {
      const { padStart } = await import('../../src/sanitizers/padStart/index.js');
      expect(padStart('7')).toBe('7');
    });
  });

  describe('padEnd', () => {
    it('deve preencher à direita até o tamanho alvo', async () => {
      const { padEnd } = await import('../../src/sanitizers/padEnd/index.js');
      expect(padEnd('A', { length: 4, char: '-' })).toBe('A---');
    });

    it('deve retornar string original quando length não for fornecido', async () => {
      const { padEnd } = await import('../../src/sanitizers/padEnd/index.js');
      expect(padEnd('A')).toBe('A');
    });
  });

  describe('normalizeEmail', () => {
    it('deve normalizar email', () => {
      const result = normalizeEmail('Test@Example.COM');
      expect(result).toBe('test@example.com');
    });

    it('deve remover dots no Gmail', () => {
      const result = normalizeEmail('test.user@gmail.com', { removeDots: true });
      expect(result).toBe('testuser@gmail.com');
    });

    it('deve remover subaddress (+)', () => {
      const result = normalizeEmail('test+tag@gmail.com', { normalizeSubaddressing: true });
      expect(result).toBe('test@gmail.com');
    });

    it('deve normalizar domínios específicos do Gmail', () => {
      const result = normalizeEmail('test@googlemail.com', { gmailRemoveDots: true });
      expect(result).toBe('test@gmail.com');
    });
  });
});
