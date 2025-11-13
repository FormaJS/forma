export const trTRCases = {
  locale: 'tr-TR',
  validate: {
    alpha: {
      valid: ['İstanbul', 'Ankara', 'Öztürk', 'Çelik'],
      invalid: ['İstanbul1', 'Ankara@', '123', 'Çelik!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'TR123', 'Test456', 'Türkiye2025'],
      invalid: ['A1B 2C3', 'TR@123', 'Test_456', 'Türkiye-2025'],
    },
    postalcode: {
      valid: ['34000', '06000', '01000'],
      invalid: ['3400', 'abcde', '123456', '34-000'],
    },
    boolean: {
      valid: ['evet', 'hayır', 'true', 'false', '1', '0'],
      invalid: ['maybe', 'sí', 'oui', '2'],
    },
    date: {
      valid: ['2020-12-31', '2021-01-01', '2022-06-15'],
      invalid: ['31/12/2020', '12/31/2020', 'invalid', '2020-13-01'],
    },
    mobilenumber: {
      valid: ['+90 532 123 4567', '0532 123 4567', '0212 123 4567'],
      invalid: ['1234567', '+44 20 7946 0958', '0532 123 456'],
    },
    taxid: {
      valid: ['1234567890', '10000000146', '10000000146'],
      invalid: ['0123456789', 'abcdefghij', '123456789'],
    },
  },
  formatters: {
    postalcode: [{ in: '34000', out: '34000' }],
    mobile: [
      { in: '5321234567', options: { format: 'local' }, out: '0532 123 4567' },
      { in: '5321234567', options: { format: 'international' }, out: '+90 532 123 4567' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '2020-12-31' }],
    taxid: [
      { in: '10000000146', options: { type: 'VKN' }, out: '10000000146' },
      { in: '10000000146', options: { type: 'TCKN' }, out: '10000000146' },
    ],
  },
  parsers: {
    boolean: [
      { in: 'evet', out: true },
      { in: 'hayır', out: false },
      { in: 'true', out: true },
      { in: 'false', out: false },
    ],
    float: [{ in: '1.234,56', out: 1234.56 }],
    int: [{ in: '1.234', out: 1234 }],
    date: [
      { in: '2020-12-31', out: new Date(Date.UTC(2020, 11, 31)) },
      { in: '31/12/2020', out: null },
    ],
  },
};
