export const esESCases = {
  locale: 'es-ES',
  validate: {
    alpha: {
      valid: ['Madrid', 'Barcelona', 'Sevilla', 'Málaga'],
      invalid: ['Madrid1', 'Barcelona@', '123', 'Sevilla!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'Test123', 'Madrid2024', 'ESP789'],
      invalid: ['A1B 2C3', 'Test@123', 'Madrid-2024', 'ESP_789'],
    },
    postalcode: {
      valid: ['28001', '08001', '41001', '29001'],
      invalid: ['2800', '080', '12345678', 'ABCDE'],
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
      valid: ['1234,56', '0,5', '1.234,56', '-123,45'],
      invalid: ['1234.56', 'abc', '12,34,56', ''],
    },
    currency: {
      valid: ['1.234,56 €', '1234,56 €', '-1.234,56 €', '0,99 €'],
      invalid: ['1234.56', '$1234', 'R$1234', '€abc'],
    },
    licensePlate: {
      valid: ['1234BBB', '5678 XYZ', '9999DDD'],
      invalid: ['ABC1234', '12345ABC', '1234AB', '1234ABCD'],
    },
    mobile: {
      valid: ['+34 612 34 56 78', '612345678', '691234567', '+34 750 12 34 56'],
      invalid: ['512345678', '0612345678', '+44 7911 123456', '61234567890'],
    },
    taxid: {
      valid: ['12345678Z', '87654321X', 'Y1234567X', 'X1234567L'],
      invalid: ['123456789', '12345678A', '11111111T', 'X1234567Z'],
    },
  },
  formatters: {
    postalcode: [{ in: '28001', out: '28001' }],
    mobile: [
      { in: '612345678', options: { format: 'local' }, out: '612 34 56 78' },
      { in: '612345678', options: { format: 'international' }, out: '+34 612 34 56 78' },
    ],
    currency: [
      { in: 1234.56, out: '1.234,56 €' },
      { in: -1234.56, out: '-1.234,56 €' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '31/12/2020' }],
    licensePlate: [{ in: '1234BBB', out: '1234 BBB' }],
    taxid: [
      { in: '12345678Z', options: { type: 'DNI' }, out: '12345678Z' },
      { in: '87654321X', options: { type: 'DNI' }, out: '87654321X' },
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
