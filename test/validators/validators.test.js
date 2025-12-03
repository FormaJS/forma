import { describe, it, expect } from 'vitest';
// Importar do index para garantir cobertura de exportações
import {
  validateBase64,
  validateByteLength,
  validateContains,
  validateCreditCard,
  validateDivisibleBy,
  validateEmail,
  validateEndsWith,
  validateEqualsTo,
  validateFQDN,
  validateIBAN,
  validateIP,
  validateIPRange,
  validateInt,
  validateIsBlacklisted,
  validateIsIn,
  validateIsWhitelisted,
  validateJSON,
  validateJWT,
  validateLength,
  validateLicensePlate,
  validateLowercase,
  validateMatches,
  validateMobileNumber,
  validateNegative,
  validateNotEmpty,
  validatePort,
  validatePositive,
  validateSlug,
  validateStartsWith,
  validateStrongPassword,
  validateURL,
  validateUppercase,
  validateCurrency,
  validateDate,
  validateNumeric,
  validatePostalCode,
} from '../../src/validators/index.js';

// Arquivo unificado: reúne testes básicos e casos adicionais de range/edge.
// Organização por categoria para facilitar manutenção.

describe('Validators', () => {
  // --------------------------------------------------
  // Grupo: Strings / Estrutura
  // --------------------------------------------------
  describe('validateBase64', () => {
    it('aceita base64 válido', () => {
      expect(validateBase64('SGVsbG8gV29ybGQ=').valid).toBe(true);
    });
    it('rejeita base64 inválido', () => {
      expect(validateBase64('Not Base64!').valid).toBe(false);
    });
  });

  describe('validateByteLength', () => {
    it('aceita dentro do range', () => {
      expect(validateByteLength('hello', { min: 3, max: 10 }).valid).toBe(true);
    });
    it('rejeita fora do range', () => {
      expect(validateByteLength('ab', { min: 5, max: 10 }).valid).toBe(false);
    });
  });

  describe('validateContains', () => {
    it('confirma substring presente', () => {
      expect(validateContains('hello world', 'world').valid).toBe(true);
    });
    it('falha quando substring ausente', () => {
      expect(validateContains('hello', 'world').valid).toBe(false);
    });
  });

  describe('validateEndsWith', () => {
    it('confere sufixo correto', () => {
      expect(validateEndsWith('hello world', 'world').valid).toBe(true);
    });
    it('falha com sufixo incorreto', () => {
      expect(validateEndsWith('hello world', 'hello').valid).toBe(false);
    });
  });

  describe('validateEqualsTo', () => {
    it('retorna válido quando igual', () => {
      expect(validateEqualsTo('test', 'test').valid).toBe(true);
    });
    it('retorna inválido quando diferente', () => {
      expect(validateEqualsTo('test', 'other').valid).toBe(false);
    });
  });

  describe('validateLength', () => {
    it('aceita tamanho no range', () => {
      expect(validateLength('hello', { min: 3, max: 10 }).valid).toBe(true);
    });
    it('rejeita tamanho fora do range', () => {
      expect(validateLength('hi', { min: 5, max: 10 }).valid).toBe(false);
    });
  });

  describe('validateNotEmpty', () => {
    it('aceita string não vazia', () => {
      expect(validateNotEmpty('hello').valid).toBe(true);
    });
    it('rejeita string vazia', () => {
      expect(validateNotEmpty('   ').valid).toBe(false);
    });
  });

  describe('validateSlug', () => {
    it('aceita slug válido', () => {
      expect(validateSlug('my-url-slug').valid).toBe(true);
    });
    it('rejeita slug inválido', () => {
      expect(validateSlug('My Invalid Slug!').valid).toBe(false);
    });
  });

  describe('validateStartsWith', () => {
    it('aceita prefixo correto', () => {
      expect(validateStartsWith('hello world', 'hello').valid).toBe(true);
    });
    it('rejeita prefixo incorreto', () => {
      expect(validateStartsWith('hello world', 'world').valid).toBe(false);
    });
  });

  describe('validateURL', () => {
    it('aceita URL válida', () => {
      expect(validateURL('https://www.example.com').valid).toBe(true);
    });
    it('rejeita URL inválida', () => {
      expect(validateURL('not a url').valid).toBe(false);
    });
  });

  // --------------------------------------------------
  // Grupo: Segurança / Conteúdo
  // --------------------------------------------------
  describe('validateIsBlacklisted', () => {
    it('retorna inválido quando valor está na blacklist', () => {
      expect(validateIsBlacklisted('bad word', { words: ['bad', 'worse'] }).valid).toBe(false);
    });
    it('retorna válido quando valor fora da blacklist', () => {
      expect(validateIsBlacklisted('good word', { words: ['bad', 'worse'] }).valid).toBe(true);
    });
  });

  describe('validateIsIn', () => {
    it('aceita valor presente na lista', () => {
      expect(validateIsIn('apple', ['apple', 'banana', 'orange']).valid).toBe(true);
    });
    it('rejeita valor ausente da lista', () => {
      expect(validateIsIn('grape', ['apple', 'banana', 'orange']).valid).toBe(false);
    });
  });

  describe('validateIsWhitelisted', () => {
    it('aceita quando todos chars pertencem à whitelist', () => {
      expect(validateIsWhitelisted('good', { chars: 'good' }).valid).toBe(true);
    });
    it('rejeita quando há caractere fora da whitelist', () => {
      expect(validateIsWhitelisted('bad!', { chars: 'bad' }).valid).toBe(false);
    });
  });

  // --------------------------------------------------
  // Grupo: Formato / Padrões
  // --------------------------------------------------
  describe('validateCreditCard', () => {
    it('aceita número de cartão válido (Luhn)', () => {
      expect(validateCreditCard('4111111111111111').valid).toBe(true);
    });
    it('rejeita número inválido', () => {
      expect(validateCreditCard('1234567890123456').valid).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('aceita email correto', () => {
      expect(validateEmail('test@example.com').valid).toBe(true);
    });
    it('rejeita email incorreto', () => {
      expect(validateEmail('not-an-email').valid).toBe(false);
    });
  });

  describe('validateFQDN', () => {
    it('aceita domínio válido', () => {
      expect(validateFQDN('example.com').valid).toBe(true);
    });
    it('rejeita domínio inválido', () => {
      expect(validateFQDN('not valid').valid).toBe(false);
    });
  });

  describe('validateIBAN', () => {
    it('aceita IBAN válido', () => {
      expect(validateIBAN('GB82WEST12345698765432').valid).toBe(true);
    });
    it('rejeita IBAN inválido', () => {
      expect(validateIBAN('INVALID').valid).toBe(false);
    });
  });

  describe('validateJSON', () => {
    it('aceita JSON objeto válido', () => {
      expect(validateJSON('{"key": "value"}').valid).toBe(true);
    });
    it('aceita JSON array válido', () => {
      expect(validateJSON('["item1", "item2", "item3"]').valid).toBe(true);
    });
    it('aceita JSON com nested objects', () => {
      expect(validateJSON('{"user": {"name": "John", "age": 30}}').valid).toBe(true);
    });
    it('aceita JSON com números', () => {
      expect(validateJSON('{"price": 99.99, "quantity": 5}').valid).toBe(true);
    });
    it('aceita JSON com valores null', () => {
      expect(validateJSON('{"value": null}').valid).toBe(true);
    });
    it('aceita JSON com booleanos', () => {
      expect(validateJSON('{"active": true, "verified": false}').valid).toBe(true);
    });
    it('aceita JSON string primitiva', () => {
      expect(validateJSON('"simple string"').valid).toBe(true);
    });
    it('aceita JSON número primitivo', () => {
      expect(validateJSON('42').valid).toBe(true);
    });
    it('rejeita JSON com sintaxe inválida', () => {
      expect(validateJSON('{invalid json}').valid).toBe(false);
    });
    it('rejeita JSON com vírgula trailing', () => {
      expect(validateJSON('{"key": "value",}').valid).toBe(false);
    });
    it('rejeita JSON com aspas simples', () => {
      expect(validateJSON("{'key': 'value'}").valid).toBe(false);
    });
    it('rejeita JSON incompleto', () => {
      expect(validateJSON('{"key": ').valid).toBe(false);
    });
    it('rejeita string vazia', () => {
      expect(validateJSON('').valid).toBe(false);
    });
  });

  describe('validateJWT', () => {
    it('aceita estrutura de JWT', () => {
      expect(
        validateJWT(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U'
        ).valid
      ).toBe(true);
    });
    it('rejeita string inválida', () => {
      expect(validateJWT('invalid').valid).toBe(false);
    });
  });

  // --------------------------------------------------
  // Grupo: Numéricos / Matemática
  // --------------------------------------------------
  describe('validateDivisibleBy', () => {
    it('aceita valor divisível', () => {
      expect(validateDivisibleBy('10', 5).valid).toBe(true);
    });
    it('rejeita valor não divisível', () => {
      expect(validateDivisibleBy('10', 3).valid).toBe(false);
    });
  });

  describe('validateInt', () => {
    it('aceita inteiro', () => {
      expect(validateInt('123').valid).toBe(true);
    });
    it('rejeita decimal', () => {
      expect(validateInt('123.45').valid).toBe(false);
    });
  });

  describe('validateNegative', () => {
    it('aceita número negativo', () => {
      expect(validateNegative('-5').valid).toBe(true);
    });
    it('rejeita número positivo', () => {
      expect(validateNegative('5').valid).toBe(false);
    });
  });

  describe('validatePort', () => {
    it('aceita porta válida', () => {
      expect(validatePort('8080').valid).toBe(true);
    });
    it('rejeita porta inválida', () => {
      expect(validatePort('99999').valid).toBe(false);
    });
  });

  describe('validatePositive', () => {
    it('aceita número positivo', () => {
      expect(validatePositive('5').valid).toBe(true);
    });
    it('rejeita número negativo', () => {
      expect(validatePositive('-5').valid).toBe(false);
    });
  });

  describe('validateCurrency (adicional)', () => {
    it('aceita valor com milhares pt-BR', () => {
      expect(validateCurrency('1.234,56', { locale: 'pt-BR' }).valid).toBe(true);
    });
    it('aceita valor com símbolo', () => {
      expect(validateCurrency('R$ 1.234,56', { locale: 'pt-BR' }).valid).toBe(true);
    });
    it('rejeita formato inválido', () => {
      expect(validateCurrency('abc', { locale: 'pt-BR' }).valid).toBe(false);
    });
  });

  describe('validateNumeric (adicional)', () => {
    it('aceita número com sinal positivo', () => {
      expect(validateNumeric('+123', { locale: 'pt-BR' }).valid).toBe(true);
    });
    it('aceita número com sinal negativo', () => {
      expect(validateNumeric('-123', { locale: 'pt-BR' }).valid).toBe(true);
    });
    it('aceita zero', () => {
      expect(validateNumeric('0', { locale: 'pt-BR' }).valid).toBe(true);
    });
    it('rejeita letras', () => {
      expect(validateNumeric('abc', { locale: 'pt-BR' }).valid).toBe(false);
    });
    it('aceita noSymbols=true', () => {
      expect(validateNumeric('123', { locale: 'pt-BR', noSymbols: true }).valid).toBe(true);
    });
  });

  // --------------------------------------------------
  // Grupo: Expressões / Regex
  // --------------------------------------------------
  describe('validateMatches', () => {
    it('aceita regex compatível', () => {
      expect(validateMatches('abc123', /^[a-z0-9]+$/).valid).toBe(true);
    });
    it('rejeita regex não compatível', () => {
      expect(validateMatches('abc!@#', /^[a-z0-9]+$/).valid).toBe(false);
    });
  });

  // --------------------------------------------------
  // Grupo: Maiúsculas / Minúsculas
  // --------------------------------------------------
  describe('validateLowercase', () => {
    it('aceita lowercase', () => {
      expect(validateLowercase('hello', { locale: 'en-US' }).valid).toBe(true);
    });
    it('rejeita com maiúsculas', () => {
      expect(validateLowercase('Hello', { locale: 'en-US' }).valid).toBe(false);
    });
  });

  describe('validateUppercase', () => {
    it('aceita uppercase', () => {
      expect(validateUppercase('HELLO', { locale: 'en-US' }).valid).toBe(true);
    });
    it('rejeita com minúsculas', () => {
      expect(validateUppercase('Hello', { locale: 'en-US' }).valid).toBe(false);
    });
  });

  // --------------------------------------------------
  // Grupo: Password
  // --------------------------------------------------
  describe('validateStrongPassword', () => {
    it('aceita senha forte', () => {
      expect(validateStrongPassword('MyP@ssw0rd123').valid).toBe(true);
    });
    it('rejeita senha fraca', () => {
      expect(validateStrongPassword('weak').valid).toBe(false);
    });
  });

  // --------------------------------------------------
  // Grupo: IP / Rede
  // --------------------------------------------------
  describe('validateIP', () => {
    it('aceita IPv4 válido', () => {
      expect(validateIP('192.168.1.1').valid).toBe(true);
    });
    it('aceita IPv6 válido', () => {
      expect(validateIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334', { version: 6 }).valid).toBe(
        true
      );
    });
    it('rejeita IP inválido', () => {
      expect(validateIP('999.999.999.999').valid).toBe(false);
    });
  });

  describe('validateIPRange', () => {
    it('aceita range IPv4 /24', () => {
      expect(validateIPRange('192.168.1.0/24').valid).toBe(true);
    });
    it('aceita range IPv4 /32 (host único)', () => {
      expect(validateIPRange('10.0.0.1/32').valid).toBe(true);
    });
    it('aceita range IPv4 /16', () => {
      expect(validateIPRange('172.16.0.0/16').valid).toBe(true);
    });
    it('aceita range IPv4 /8', () => {
      expect(validateIPRange('10.0.0.0/8').valid).toBe(true);
    });
    it('aceita range IPv6', () => {
      expect(validateIPRange('2001:db8::/32').valid).toBe(true);
    });
    it('aceita range IPv6 completo', () => {
      expect(validateIPRange('fe80::1/64').valid).toBe(true);
    });
    it('rejeita IP sem CIDR', () => {
      expect(validateIPRange('192.168.1.1').valid).toBe(false);
    });
    it('rejeita CIDR inválido (> 32 para IPv4)', () => {
      expect(validateIPRange('192.168.1.0/33').valid).toBe(false);
    });
    it('rejeita CIDR negativo', () => {
      expect(validateIPRange('192.168.1.0/-1').valid).toBe(false);
    });
    it('rejeita IP inválido no range', () => {
      expect(validateIPRange('999.999.999.999/24').valid).toBe(false);
    });
    it('rejeita string aleatória', () => {
      expect(validateIPRange('not-a-range').valid).toBe(false);
    });
    it('rejeita string vazia', () => {
      expect(validateIPRange('').valid).toBe(false);
    });
  });

  // --------------------------------------------------
  // Grupo: Datas / CEP (adicionais)
  // --------------------------------------------------
  describe('validateDate - range', () => {
    it('aceita minDate string', () => {
      const r = validateDate('2024-06-15', { locale: 'pt-BR', minDate: '2024-01-01' });
      expect(r.valid).toBe(true);
    });
    it('rejeita menor que minDate', () => {
      const r = validateDate('2023-12-31', { locale: 'pt-BR', minDate: '2024-01-01' });
      expect(r.valid).toBe(false);
      expect(r.error).toBe('validateDateMin');
    });
    it('aceita maxDate string', () => {
      const r = validateDate('2024-06-15', { locale: 'pt-BR', maxDate: '2024-12-31' });
      expect(r.valid).toBe(true);
    });
    it('rejeita maior que maxDate', () => {
      const r = validateDate('2025-01-01', { locale: 'pt-BR', maxDate: '2024-12-31' });
      expect(r.valid).toBe(false);
      expect(r.error).toBe('validateDateMax');
    });
    it('aceita entre minDate e maxDate', () => {
      const r = validateDate('2024-06-15', {
        locale: 'pt-BR',
        minDate: '2024-01-01',
        maxDate: '2024-12-31',
      });
      expect(r.valid).toBe(true);
    });
    it('aceita minDate Date object', () => {
      const r = validateDate('2024-06-15', {
        locale: 'pt-BR',
        minDate: new Date('2024-01-01T00:00:00Z'),
      });
      expect(r.valid).toBe(true);
    });
    it('aceita maxDate Date object', () => {
      const r = validateDate('2024-06-15', {
        locale: 'pt-BR',
        maxDate: new Date('2024-12-31T23:59:59Z'),
      });
      expect(r.valid).toBe(true);
    });
    it('rejeita tipo inválido', () => {
      const r = validateDate({}, { locale: 'pt-BR' });
      expect(r.valid).toBe(false);
      expect(r.error).toBe('invalidType');
    });
  });

  describe('validatePostalCode (adicional)', () => {
    it('aceita CEP com hífen', () => {
      expect(validatePostalCode('01310-100', { locale: 'pt-BR' }).valid).toBe(true);
    });
    it('aceita CEP sem hífen', () => {
      expect(validatePostalCode('01310100', { locale: 'pt-BR' }).valid).toBe(true);
    });
    it('rejeita CEP inválido', () => {
      expect(validatePostalCode('123', { locale: 'pt-BR' }).valid).toBe(false);
    });
    it('aceita ZIP americano', () => {
      expect(validatePostalCode('12345', { locale: 'en-US' }).valid).toBe(true);
    });
    it('aceita ZIP+4 americano', () => {
      expect(validatePostalCode('12345-6789', { locale: 'en-US' }).valid).toBe(true);
    });
  });

  describe('validateMobileNumber', () => {
    it('aceita celular brasileiro formato completo', async () => {
      const r = await validateMobileNumber('+55 11 98765-4321', { locale: 'pt-BR' });
      expect(r.valid).toBe(true);
    });
    it('aceita celular brasileiro sem formatação', async () => {
      const r = await validateMobileNumber('11987654321', { locale: 'pt-BR' });
      expect(r.valid).toBe(true);
    });
    it('aceita celular brasileiro com parênteses', async () => {
      const r = await validateMobileNumber('(11) 98765-4321', { locale: 'pt-BR' });
      expect(r.valid).toBe(true);
    });
    it('aceita celular canadense', async () => {
      const r = await validateMobileNumber('+1 416 555 1234', { locale: 'en-CA' });
      expect(r.valid).toBe(true);
    });
    it('aceita celular indiano', async () => {
      const r = await validateMobileNumber('+91 9876543210', { locale: 'en-IN' });
      expect(r.valid).toBe(true);
    });
    it('rejeita número com poucos dígitos', async () => {
      const r = await validateMobileNumber('123', { locale: 'pt-BR' });
      expect(r.valid).toBe(false);
    });
    it('rejeita número fixo brasileiro', async () => {
      const r = await validateMobileNumber('11 3456-7890', { locale: 'pt-BR' });
      expect(r.valid).toBe(false);
    });
    it('rejeita sem locale', async () => {
      const r = await validateMobileNumber('11987654321');
      expect(r.valid).toBe(false);
      expect(r.error).toBe('localeRequired');
    });
    it('rejeita tipo não-string', async () => {
      const r = await validateMobileNumber(123456789, { locale: 'pt-BR' });
      expect(r.valid).toBe(false);
      expect(r.error).toBe('invalidType');
    });
  });

  describe('validateLicensePlate', () => {
    it('aceita placa brasileira formato antigo', async () => {
      const r = await validateLicensePlate('ABC-1234', { locale: 'pt-BR' });
      expect(r.valid).toBe(true);
    });
    it('aceita placa brasileira Mercosul', async () => {
      const r = await validateLicensePlate('ABC1D23', { locale: 'pt-BR' });
      expect(r.valid).toBe(true);
    });
    it('aceita placa brasileira sem hífen', async () => {
      const r = await validateLicensePlate('ABC1234', { locale: 'pt-BR' });
      expect(r.valid).toBe(true);
    });
    it('aceita placa portuguesa', async () => {
      const r = await validateLicensePlate('AA-12-34', { locale: 'pt-PT' });
      expect(r.valid).toBe(true);
    });
    it('aceita placa francesa formato atual', async () => {
      const r = await validateLicensePlate('AA-123-BB', { locale: 'fr-FR' });
      expect(r.valid).toBe(true);
    });
    it('aceita placa francesa formato antigo', async () => {
      const r = await validateLicensePlate('AB456CD', { locale: 'fr-FR' });
      expect(r.valid).toBe(true);
    });
    it('aceita placa alemã', async () => {
      const r = await validateLicensePlate('B-AB 123', { locale: 'de-DE' });
      expect(r.valid).toBe(true);
    });
    it('aceita placa italiana', async () => {
      const r = await validateLicensePlate('AB123CD', { locale: 'it-IT' });
      expect(r.valid).toBe(true);
    });
    it('aceita placa indiana', async () => {
      const r = await validateLicensePlate('DL 01 AB 1234', { locale: 'en-IN' });
      expect(r.valid).toBe(true);
    });
    it('rejeita placa com formato inválido', async () => {
      const r = await validateLicensePlate('INVALID', { locale: 'pt-BR' });
      expect(r.valid).toBe(false);
    });
    it('rejeita placa muito curta', async () => {
      const r = await validateLicensePlate('AB', { locale: 'pt-BR' });
      expect(r.valid).toBe(false);
    });
    it('rejeita string vazia', async () => {
      const r = await validateLicensePlate('', { locale: 'pt-BR' });
      expect(r.valid).toBe(false);
      expect(r.error).toBe('isEmpty');
    });
    it('rejeita sem locale', async () => {
      const r = await validateLicensePlate('ABC-1234');
      expect(r.valid).toBe(false);
      expect(r.error).toBe('localeRequired');
    });
    it('rejeita tipo não-string', async () => {
      const r = await validateLicensePlate(12345, { locale: 'pt-BR' });
      expect(r.valid).toBe(false);
      expect(r.error).toBe('invalidType');
    });
  });
});
