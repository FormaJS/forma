export const esARCases = {
  locale: 'es-AR',
  validate: {
    alpha: {
      valid: ['Buenos', 'Córdoba', 'Rosario', 'Mendoza'],
      invalid: ['Buenos1', 'Córdoba@', '123', 'Rosario!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'Test123', 'Buenos2024', 'ARG456'],
      invalid: ['A1B 2C3', 'Test@123', 'Buenos-2024', 'ARG_456'],
    },
    postalcode: { valid: ['C1234ABC'], invalid: ['12345', '1234ABC', 'ABCDEFGH', 'C12'] },
    boolean: {
      valid: ['sí', 'no', 'true', 'false', '1', '0', 's', 'n'],
      invalid: ['maybe', 'oui', 'yes', '2', 'SÍ', 'NO'],
    },
    date: {
      valid: ['31/12/2020', '01/01/2021', '15/06/2022'],
      invalid: ['2020-12-31', '12/31/2020', '32/01/2020', 'invalid'],
    },
    decimal: {
      valid: ['1234,56', '0,5', '1.234,56', '-123,45'],
      invalid: ['1234.56', 'abc', '12,34,56', ''],
    },
    currency: {
      valid: ['$ 1.234,56', '$1234,56', '$0,99'],
      invalid: ['1234,56', 'R$1234', '€1234', '$abc'],
    },
    licensePlate: {
      valid: ['AB123CD', 'ABC123', 'XY999ZZ'],
      invalid: ['A123CD', 'ABC12', '123ABC', 'AB12CD'],
    },
    mobile: {
      valid: ['91 1234-5678', '+54 9 91 1234-5678', '9112345678'],
      invalid: ['1234567890', '+1 416 555 1234', '911234', '11123456'],
    },
    taxid: {
      // Use algorithm-valid CUIT examples (computed check digits) in both formatted and unformatted forms.
      valid: ['20-00000000-1', '20000000001', '30-00000000-7', '30000000007'],
      invalid: [
        '20-12345678-9',
        '20123456789',
        '30-71234567-8',
        '20-12345678-0',
        '10123456789',
        '20123456',
        '20-12345678',
      ],
    },
  },
  formatters: {
    postalcode: [
      { in: 'C1234ABC', out: 'C1234ABC' },
      { in: 'B5000XYZ', out: 'B5000XYZ' },
    ],
    mobile: [
      { in: '9112345678', options: { format: 'local' }, out: '91 1234-5678' },
      { in: '9112345678', options: { format: 'international' }, out: '+54 9 91 1234-5678' },
    ],
    currency: [
      { in: 1234.56, out: '$ 1.234,56' },
      { in: -1234.56, out: '-$ 1.234,56' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '31/12/2020' }],
    licensePlate: [{ in: 'AB123CD', out: 'AB 123 CD' }],
    taxid: [
      { in: '20123456789', options: { type: 'CUIT' }, out: '20-12345678-9' },
      { in: '30712345678', options: { type: 'CUIT' }, out: '30-71234567-8' },
    ],
  },
  parsers: {
    boolean: [
      { in: 'sí', out: true },
      { in: 'no', out: false },
      { in: 'true', out: true },
      { in: 'false', out: false },
    ],
    float: [{ in: '1.234,56', out: 1234.56 }],
    int: [{ in: '1.234', out: 1234 }],
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
