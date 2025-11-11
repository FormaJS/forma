export const deDECases = {
  locale: 'de-DE',
  validate: {
    alpha: {
      valid: ['München', 'Köln', 'Düsseldorf', 'Über'],
      invalid: ['München1', 'Köln@', '123', 'Über!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'Test123', 'Berlin2024', 'XYZ789'],
      invalid: ['A1B 2C3', 'Test@123', 'Berlin-2024', 'XYZ_789'],
    },
    postalcode: {
      valid: ['10115', '80331', '50667', '40210'],
      invalid: ['1011', '123', '12345678', 'ABCDE'],
    },
    licensePlate: {
      valid: ['B-AB 1234', 'M-CD 5678', 'HH-XY 999'],
      invalid: ['BAB-1234', '1234 AB', 'B AB-1234', 'ABCD-1234'],
    },
    boolean: {
      valid: ['ja', 'nein', 'true', 'false', '1', '0', 'j', 'n'],
      invalid: ['maybe', 'oui', 'yes', '2', 'JA', 'NEIN'],
    },
    date: {
      valid: ['31.12.2020', '01.01.2021', '15.06.2022'],
      invalid: ['2020-12-31', '12/31/2020', '32.01.2020', 'invalid'],
    },
    decimal: {
      valid: ['1234,56', '0,5', '1.234,56', '-123,45'],
      invalid: ['1234.56', 'abc', '12,34,56', ''],
    },
    currency: {
      valid: ['1.234,56 €', '1234,56 €', '-1.234,56 €', '0,99 €'],
      invalid: ['1234.56', '$1234', 'R$1234', '€abc'],
    },
    taxid: {
      valid: ['DE136695976'],
      invalid: ['06593526737', '00593526737', '12345678901', 'DE123456789'],
    },
    mobile: {
      valid: ['+49 171 9876543', '0171 987 6543', '0151 234 5678', '+49151 234 5678'],
      invalid: ['01012345678', '1234567', '+44 7911 123456', '0181 234 5678'],
    },
  },
  formatters: {
    postalcode: [{ in: '10115', out: '10115' }],
    mobile: [
      { in: '151234567', options: { format: 'local' }, out: '015 1234567' },
      { in: '1512345678', options: { format: 'international' }, out: '+49 15 12345678' },
    ],
    currency: [
      { in: 1234.56, out: '1.234,56 €' },
      { in: -1234.56, out: '-1.234,56 €' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '31.12.2020' }],
  },
  parsers: {
    boolean: [
      { in: 'ja', out: true },
      { in: 'nein', out: false },
      { in: 'true', out: true },
      { in: 'false', out: false },
    ],
    float: [{ in: '1.234,56', out: 1234.56 }],
    int: [{ in: '1.234', out: 1234 }],
    date: [
      { in: '31.12.2020', out: new Date(Date.UTC(2020, 11, 31)) },
      { in: '01.01.2021', out: new Date(Date.UTC(2021, 0, 1)) },
      { in: '15.06.2022', out: new Date(Date.UTC(2022, 5, 15)) },
      { in: '12/31/2020', out: null },
      { in: '31.02.2020', out: null },
      { in: 'not a date', out: null },
    ],
  },
};
