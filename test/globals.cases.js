// Centralizes test cases for global validators (independent of locale).

export const GLOBAL_CASES = {
  isHexadecimal: {
    valid: ['deadBEEF', 'ff0044', '0123456789ABCDEF', '1234567890abcdef'],
    invalid: ['abcdefg', '0x1234', '#ff0044', 'hello world'],
  },
  isBIC: {
    valid: ['DEUTDEFF', 'NEDSZAJJ', 'DABADKKK'],
    invalid: ['DEUT', 'DEUTDEFG1', 'DE12DEFF', 'ABCD123456'],
  },
  isUUID: {
    valid: [
      'A987FBC9-4BED-3078-9F07-9141BA07C9F3',
      'A987FBC9-4BED-4078-8F07-9141BA07C9F3',
      '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    ],
    invalid: [
      'A987FBC9-4BED-3078-CF07-9141BA07C9F',
      'A987FBC94BED3078CF079141BA07C9F3',
      'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
    ],
  },
  isISINCode: {
    valid: ['US0378331005', 'AU0000XVGZA3', 'GB0002634946', 'FR0000120271'],
    invalid: ['US0378331004', 'DE000000000', 'AA0000000000', 'US03783310'],
  },
  isISSN: {
    valid: ['0378-5955', '2049-3630', '1562-6865'],
    invalid: ['0378595', '0378-59555', 'abcd-efgh', '0378-ABCD'],
  },
  isISRC: {
    valid: ['USRC17607839', 'GBAYE1200000', 'FRZ039800212'],
    invalid: ['USRC176078', 'USRC17607839000', '@@@@@@@@@@@@', 'USRC176078AB'],
  },
  isISBN10: {
    valid: ['0306406152', '043942089X'],
    invalid: ['0306406151', '123456789', 'abcdefghij'],
  },
  isISBN13: {
    valid: ['9780306406157', '9783161484100'],
    invalid: ['9780306406150', '12345678901234', '978030640615'],
  },
  isHexColor: {
    valid: ['#ff0000', '#FF0000', '#f00', '#F00'],
    invalid: ['#ff', '#ff00gg', 'gg0000', '#ff00000', 'red', 'ff0000', 'f00'],
  },
  isIMEI: {
    valid: ['352099001761481', '35-209900-176148-1', '35 209900 176148 1', '490154203237518'],
    invalid: ['352099001761480', '35209900176148', '3520990017614810', 'abcdefghijklmno'],
  },
  'ISO3166-1-alpha-2': {
    valid: ['US', 'BR', 'GB', 'DE', 'FR', 'CA'],
    invalid: ['U', 'USA', '12', 'A1', '@@'],
  },
  'ISO3166-1-alpha-3': {
    valid: ['USA', 'BRA', 'GBR', 'DEU', 'FRA', 'CAN'],
    invalid: ['US', 'USAA', '123', 'A1B', '@@@'],
  },
  ISO639_1: {
    valid: ['en', 'pt', 'es', 'fr', 'de', 'it'],
    invalid: ['eng', 'por', 'xyz', 'ABC', '12', 'e'],
  },
  ISO4217: {
    valid: ['USD', 'BRL', 'EUR', 'GBP', 'JPY', 'CAD'],
    invalid: ['US', 'ABCD', '123', 'AB', 'A', '@@@'],
  },
  isMongoId: {
    valid: ['507f1f77bcf86cd799439011', '507f191e810c19729de860ea', '5e9f8f8f8f8f8f8f8f8f8f8f'],
    invalid: [
      '507f1f77bcf86cd79943901',
      '507f1f77bcf86cd799439011a',
      'xyz123',
      '507f1f77bcf86cd799439g11',
    ],
  },
  isDataURI: {
    valid: [
      'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==',
      'data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA',
      'data:,Hello%2C%20World!',
    ],
    invalid: ['http://example.com/image.png', 'SGVsbG8sIFdvcmxkIQ==', 'data:', 'text/plain,Hello'],
  },
  isHSL: {
    valid: [
      'hsl(360, 100%, 50%)',
      'hsl(0,0%,0%)',
      'hsl(120, 50%, 50%)',
      'hsla(240, 100%, 50%, 0.5)',
    ],
    invalid: ['hsl(361, 100%, 50%)', 'hsl(360, 101%, 50%)', 'rgb(255,0,0)', 'hsl(360 100% 50%)'],
  },
  isMimeType: {
    valid: ['text/plain', 'image/png', 'application/json', 'video/mp4', 'audio/mpeg'],
    invalid: ['text', 'text/', '/plain', 'text/plain/extra', 'image-png'],
  },
  isMultibyte: {
    valid: ['こんにちは', '你好', '안녕하세요', 'مرحبا', 'Привет'],
    invalid: ['hello', 'world', '123', 'abc', 'test'],
  },
  isAscii: {
    valid: ['hello', 'world', '123', 'ABC', 'test123'],
    invalid: ['こんにちは', '你好', 'café', 'Привет', 'naïve'],
  },
  isSemVer: {
    valid: ['1.0.0', '1.2.3', '1.0.0-alpha', '1.0.0-alpha.1', '1.0.0+20130313144700'],
    invalid: ['1', '1.2', '1.2.3.4', 'a.b.c', ''],
  },
  isSurrogatePair: {
    valid: ['𝌆', '😀', '🎉', '💻', '🚀'],
    invalid: ['a', 'abc', '123', 'hello', 'こ'],
  },
  isMACAddress: {
    valid: ['00:1B:44:11:3A:B7', '00-1B-44-11-3A-B7', '00:1b:44:11:3a:b7'],
    invalid: ['00:1B:44:11:3A', '00:1B:44:11:3A:B7:CD', 'ZZ:1B:44:11:3A:B7', '00-1B-44-11-3A-G7'],
    // Parsers
    toJSON: {
      valid: [
        { in: '{"name":"test"}', out: { name: 'test' } },
        { in: '[1,2,3]', out: [1, 2, 3] },
        { in: 'true', out: true },
        { in: '123', out: 123 },
        { in: 'null', out: null },
      ],
      invalid: ['{invalid}', 'undefined', 'NaN', '{name:test}', ''],
    },
    validateBase64: {
      valid: ['SGVsbG8sIFdvcmxkIQ==', 'VGVzdDEyMzQ=', 'YWJjZGVmZ2hpams=', 'MTIzNDU2Nzg5MA=='],
      invalid: ['Hello World', 'Test@123', 'abc def', '12345!!!', ''],
    },
    validateByteLength: {
      valid: [
        { in: 'test', options: { min: 1, max: 10 } },
        { in: 'hello', options: { min: 5, max: 5 } },
        { in: 'a', options: { min: 1 } },
        { in: 'abc', options: { max: 10 } },
      ],
      invalid: [
        { in: 'test', options: { min: 10 } },
        { in: 'hello world', options: { max: 5 } },
        { in: 'abc', options: { min: 5, max: 10 } },
      ],
    },
    validateContains: {
      valid: [
        { in: 'hello world', options: { seed: 'world' } },
        { in: 'test123', options: { seed: '123' } },
        { in: 'FormaJS', options: { seed: 'Forma' } },
      ],
      invalid: [
        { in: 'hello world', options: { seed: 'test' } },
        { in: 'abc', options: { seed: 'xyz' } },
        { in: 'FormaJS', options: { seed: 'forma' } }, // case-sensitive
      ],
    },
    validateCreditCard: {
      valid: [
        '4532015112830366', // Visa
        '5425233430109903', // Mastercard
        '374245455400126', // Amex
        '6011111111111117', // Discover
      ],
      invalid: ['1234567890123456', '4532015112830367', '0000000000000000', 'abcd1234efgh5678'],
    },
    validateDivisibleBy: {
      valid: [
        { in: '10', options: { divisor: 2 } },
        { in: '15', options: { divisor: 5 } },
        { in: '100', options: { divisor: 10 } },
        { in: '0', options: { divisor: 5 } },
      ],
      invalid: [
        { in: '10', options: { divisor: 3 } },
        { in: '7', options: { divisor: 2 } },
        { in: 'abc', options: { divisor: 2 } },
      ],
    },
    // Sanitizers
    blacklist: {
      cases: [
        { in: 'hello@world', options: { chars: '@' }, out: 'helloworld' },
        { in: 'test-123_456', options: { chars: '-_' }, out: 'test123456' },
        { in: 'abc123!@#', options: { chars: '!@#' }, out: 'abc123' },
      ],
    },
    escapeHTML: {
      cases: [
        {
          in: '<script>alert("xss")</script>',
          out: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
        },
        { in: 'Hello & "World"', out: 'Hello &amp; &quot;World&quot;' },
        { in: "<div class='test'>", out: '&lt;div class=&#x27;test&#x27;&gt;' },
      ],
    },
    lTrim: {
      cases: [
        { in: '   hello', out: 'hello' },
        { in: '\t\ntest', out: 'test' },
        { in: '   hello world   ', out: 'hello world   ' },
        { in: 'no spaces', out: 'no spaces' },
      ],
    },
    rTrim: {
      cases: [
        { in: 'hello   ', out: 'hello' },
        { in: 'test\t\n', out: 'test' },
        { in: '   hello world   ', out: '   hello world' },
        { in: 'no spaces', out: 'no spaces' },
      ],
    },
    trim: {
      cases: [
        { in: '   hello   ', out: 'hello' },
        { in: '\t\ntest\t\n', out: 'test' },
        { in: '   hello world   ', out: 'hello world' },
        { in: 'no spaces', out: 'no spaces' },
      ],
    },
    padStart: {
      cases: [
        { in: '5', options: { length: 3, chars: '0' }, out: '005' },
        { in: 'test', options: { length: 10, chars: ' ' }, out: '      test' },
        { in: 'abc', options: { length: 5, chars: 'x' }, out: 'xxabc' },
      ],
    },
    padEnd: {
      cases: [
        { in: '5', options: { length: 3, chars: '0' }, out: '500' },
        { in: 'test', options: { length: 10, chars: ' ' }, out: 'test      ' },
        { in: 'abc', options: { length: 5, chars: 'x' }, out: 'abcxx' },
      ],
    },
    stripTags: {
      cases: [
        { in: '<p>Hello World</p>', out: 'Hello World' },
        { in: '<div><b>Bold</b> and <i>Italic</i></div>', out: 'Bold and Italic' },
        { in: 'No <script>tags</script> here', out: 'No tags here' },
        { in: 'Plain text', out: 'Plain text' },
      ],
    },
    toSlug: {
      cases: [
        { in: 'Hello World', out: 'hello-world' },
        { in: 'São Paulo', out: 'sao-paulo' },
        { in: 'Test 123 ABC', out: 'test-123-abc' },
        { in: 'Special!@#$%Characters', out: 'specialcharacters' },
        { in: '  Multiple   Spaces  ', out: 'multiple-spaces' },
      ],
    },
    unescapeHTML: {
      cases: [
        {
          in: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
          out: '<script>alert("xss")</script>',
        },
        { in: 'Hello &amp; &quot;World&quot;', out: 'Hello & "World"' },
        { in: '&lt;div class=&#x27;test&#x27;&gt;', out: "<div class='test'>" },
      ],
    },
    whitelist: {
      cases: [
        { in: 'abc123', options: { chars: 'abc' }, out: 'abc' },
        { in: 'hello123world', options: { chars: '0123456789' }, out: '123' },
        { in: 'Test@123!', options: { chars: 'a-zA-Z0-9' }, out: 'Test123' },
      ],
    },
  },
};
