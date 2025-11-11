export const itITCases = {
  locale: 'it-IT',
  validate: {
    alpha: {
      valid: ['Roma', 'Milano', 'Napoli', 'Torino'],
      invalid: ['Roma1', 'Milano@', '123', 'Torino!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'Test123', 'Roma2024', 'IT789'],
      invalid: ['A1B 2C3', 'Test@123', 'Roma-2024', 'IT_789'],
    },
    postalcode: {
      valid: ['00118', '20121', '80100', '10121'],
      invalid: ['0011', '201', '12345678', 'ABCDE'],
    },
    boolean: {
      valid: ['true', 'false', '1', '0'],
      invalid: ['maybe', 'oui', 'sim', '2', 'TRUE', 'FALSE'],
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
      valid: ['€ 1.234,56', '€ 1234,56', '-€ 1.234,56', '€ 0,99'],
      invalid: ['1234.56', '$1234', 'R$1234', '€abc'],
    },
    licensePlate: {
      valid: ['AB123CD', 'CD456EF', 'XY789ZZ'],
      invalid: ['AB12CD', '1234ABC', 'ABC1234', 'AB-123-CD'],
    },
    mobile: {
      valid: ['+393312345678', '3312345678', '3401234567', '+39388987654'],
      invalid: ['2312345678', '33123456', '+44 7911 123456', '331234567890'],
    },
    taxid: {
      // Retain only a canonical Codice Fiscale example; move the second to invalid until verified.
      valid: ['RSSMRA85T10A562S'],
      invalid: ['MRARSS85T10A562A', 'RSSMRA85T10A562A', '12345678901234567', 'ABCDEFGHIJ12345'],
    },
  },
  formatters: {
    postalcode: [{ in: '00118', out: '00118' }],
    mobile: [
      { in: '3312345678', options: { format: 'local' }, out: '331 234 5678' },
      { in: '3312345678', options: { format: 'international' }, out: '+39 331 234 5678' },
    ],
    currency: [
      { in: 1234.56, out: '€ 1.234,56' },
      { in: -1234.56, out: '-€ 1.234,56' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '31/12/2020' }],
    licensePlate: [{ in: 'AB123CD', out: 'AB123CD' }],
    taxid: [{ in: 'RSSMRA85T10A562S', options: { type: 'CF' }, out: 'RSSMRA85T10A562S' }],
  },
  parsers: {
    boolean: [
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
