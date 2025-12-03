export const enAUCases = {
  locale: 'en-AU',
  validate: {
    alpha: {
      valid: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
      invalid: ['Sydn3y', 'Melbourne1', '123', 'Perth@'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'Test123', 'Sydney2024', 'XYZ789'],
      invalid: ['A1B 2C3', 'Test@123', 'Sydney-2024', 'XYZ_789'],
    },
    postalcode: {
      valid: ['3000', '2000', '4000', '6000'],
      invalid: ['300', '12345', 'ABCD', '00000'],
    },
    mobile: {
      valid: ['0412345678', '0412 345 678'],
      invalid: ['0312 345 678', '1234567890', '+1 416 555 1234', '041234'],
    },
    taxid: {
      valid: ['123456782', '876543210', '51824753556'],
      invalid: ['123456789', '111111111', '000000000', '1234567'],
    },
    boolean: {
      valid: ['yes', 'no', 'true', 'false', '1', '0', 'y', 'n'],
      invalid: ['maybe', 'oui', 'sim', '2', 'YES', 'NO'],
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
    licensePlate: {
      valid: ['ABC123', 'AB 12', 'ABC12XY', 'XY-123'],
      invalid: ['A123', 'ABCD1234', '1234', 'ABC1234567'],
    },
  },
  formatters: {
    postalcode: [{ in: '3000', out: '3000' }],
    mobile: [
      { in: '12345678', options: { format: 'local' }, out: '0412 345 678' },
      { in: '12345678', options: { format: 'international' }, out: '+61 412 345 678' },
    ],
    currency: [
      { in: 1234.56, out: '$1,234.56' },
      { in: -1234.56, out: '-$1,234.56' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '31/12/2020' }],
    licensePlate: [{ in: 'ABC123', out: 'ABC-123' }],
    taxid: [{ in: '123456782', options: { type: 'TFN' }, out: '123 456 782' }],
  },
  parsers: {
    boolean: [
      { in: 'yes', out: true },
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
