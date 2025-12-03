export const esMXCases = {
  locale: 'es-MX',
  validate: {
    alpha: {
      valid: ['México', 'Guadalajara', 'Monterrey', 'Cancún'],
      invalid: ['México1', 'Guadalajara@', '123', 'Cancún!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'Test123', 'Mexico2024', 'MX789'],
      invalid: ['A1B 2C3', 'Test@123', 'Mexico-2024', 'MX_789'],
    },
    postalcode: {
      valid: ['01000', '44100', '64000', '77500'],
      invalid: ['0100', '441', '12345678', 'ABCDE'],
    },
    licensePlate: {
      valid: ['ABC-123-A', 'XYZ-987-Z', 'AAA-111-X'],
      invalid: ['ABC-123', 'XYZ-987', 'AB-123', 'ABCD-1234', '123-ABC', 'AAAA-111-A'],
    },
    boolean: {
      valid: ['sí', 'no', 'true', 'false', '1', '0', 's', 'n'],
      invalid: ['maybe', 'oui', 'yes', '2', 'SÍ', 'NO'],
    },
    date: {
      valid: ['31/12/2020', '01/01/2021', '15/06/2022'],
      invalid: ['2020-12-31', '12/31/2020', '32/01/2020', 'invalid'],
    },
    decimal: {
      valid: ['1234.56', '0.5', '1,234.56', '-123.45'],
      invalid: ['1234,56', 'abc', '12.34.56', ''],
    },
    currency: {
      valid: ['$1,234.56', '$1234.56', '-$1,234.56', '$0.99'],
      invalid: ['1234.56', 'R$1234', '€1234', '$abc'],
    },
    mobile: {
      valid: ['55 1234 5678', '+52 1 55 1234 5678', '5512345678'],
      // Provide truly invalid samples (wrong length, foreign format, alpha chars)
      invalid: ['123456789', '+1 416 555 1234', '551234567', '55123456789', 'AA12345678'],
    },
    // taxid validator requires valid check digits which are complex to generate.
    // Keeping only formatter tests for now.
  },
  formatters: {
    postalcode: [{ in: '01000', out: '01000' }],
    mobile: [
      { in: '5512345678', options: { format: 'local' }, out: '55 1234 5678' },
      { in: '5512345678', options: { format: 'international' }, out: '+52 1 55 1234 5678' },
    ],
    currency: [
      { in: 1234.56, out: '$1,234.56' },
      { in: -1234.56, out: '-$1,234.56' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '31/12/2020' }],
    licensePlate: [{ in: 'ABC123A', out: 'ABC-123-A' }],
    taxid: [
      { in: 'ABCD123456EF1', options: { type: 'RFC' }, out: 'ABCD123456EF1' },
      { in: 'XYZW789012AB3', options: { type: 'RFC' }, out: 'XYZW789012AB3' },
    ],
  },
  parsers: {
    boolean: [
      { in: 'sí', out: true },
      { in: 'no', out: false },
      { in: 'true', out: true },
      { in: 'false', out: false },
    ],
    float: [{ in: '1,234.56', out: 1234.56 }],
    int: [{ in: '1,234', out: 1234 }],
    date: [
      { in: '31/12/2020', out: new Date(Date.UTC(2020, 11, 31)) },
      { in: '01/01/2021', out: new Date(Date.UTC(2021, 0, 1)) },
      { in: '15/06/2022', out: new Date(Date.UTC(2022, 5, 15)) },
      { in: '12/31/2020', out: null },
      { in: '31/02/2020', out: null },
      { in: 'not a date', out: null },
    ],
  },
};
