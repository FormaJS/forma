export const ptPTCases = {
  locale: 'pt-PT',
  validate: {
    alpha: {
      valid: ['Lisboa', 'Porto', 'Coimbra', 'Fátima'],
      invalid: ['Lisboa1', 'Porto@', '123', 'Fátima!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'Test123', 'Lisboa2024', 'PT789'],
      invalid: ['A1B 2C3', 'Test@123', 'Lisboa-2024', 'PT_789'],
    },
    postalcode: { valid: ['1000-001'], invalid: ['1000', '100', '12345678', 'ABCDE'] },
    boolean: {
      valid: ['sim', 'não', 'verdadeiro', 'falso', '1', '0'],
      invalid: ['maybe', 'oui', 'yes', '2', 'SIM', 'NÃO'],
    },
    date: {
      valid: ['31/12/2020', '01/01/2021', '15/06/2022'],
      invalid: ['2020-12-31', '12/31/2020', '32/01/2020', 'invalid'],
    },
    decimal: {
      valid: ['1234,56', '0,5', '1 234,56', '-123,45'],
      invalid: ['1234.56', 'abc', '12,34,56', ''],
    },
    currency: {
      valid: ['1 234,56 €', '1234,56 €', '-1 234,56 €', '0,99 €'],
      invalid: ['1234.56', '$1234', 'R$1234', '€abc'],
    },
    licensePlate: {
      valid: ['AA-12-34', 'BB-99-88', '12-34-AB'],
      invalid: ['AA1234', 'A-12-34', 'AA-12-3', 'AB12CD'],
    },
    mobile: {
      valid: ['+351912345678', '912345678', '911234567', '+351961234567'],
      invalid: ['812345678', '0912345678', '+44 7911 123456', '91234567890'],
    },
    taxid: {
      valid: ['123456789', '1 2345 6789'],
      invalid: ['12345678', '1234567890', '000000000', '111111111'],
    },
  },
  formatters: {
    postalcode: [{ in: '1000001', out: '1000-001' }],
    mobile: [
      { in: '912345678', options: { format: 'local' }, out: '912 345 678' },
      { in: '912345678', options: { format: 'international' }, out: '+351 912 345 678' },
    ],
    currency: [
      { in: 1234.56, out: '1 234,56 €' },
      { in: -1234.56, out: '-1 234,56 €' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '31/12/2020' }],
    licensePlate: [{ in: 'AA1234', out: 'AA-12-34' }],
    taxid: [{ in: '123456789', options: { type: 'NIF' }, out: '1 2345 6789' }],
  },
  parsers: {
    boolean: [
      { in: 'sim', out: true },
      { in: 'não', out: false },
      { in: 'verdadeiro', out: true },
      { in: 'falso', out: false },
    ],
    float: [{ in: '1 234,56', out: 1234.56 }],
    int: [{ in: '1 234', out: 1234 }],
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
