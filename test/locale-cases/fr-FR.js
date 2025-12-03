export const frFRCases = {
  locale: 'fr-FR',
  validate: {
    alpha: {
      valid: ['Paris', 'Lyon', 'Marseille', 'École'],
      invalid: ['Paris1', 'Lyon@', '123', 'École!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'Test123', 'Paris2024', 'FR789'],
      invalid: ['A1B 2C3', 'Test@123', 'Paris-2024', 'FR_789'],
    },
    postalcode: {
      valid: ['75001', '69001', '13001', '33000'],
      invalid: ['7500', '690', '12345678', 'ABCDE'],
    },
    boolean: {
      valid: ['oui', 'non', 'true', 'false', '1', '0'],
      invalid: ['maybe', 'sim', 'yes', '2', 'OUI', 'NON'],
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
      valid: ['AA-123-BB', 'AB456CD', 'XY-999-ZZ'],
      invalid: ['A123BB', 'AB12CD', 'ABCD-123-EF', '123-ABC'],
    },
    mobile: {
      valid: ['+33612345678', '0612345678', '0712345678', '+33 799887766'],
      invalid: ['0512345678', '061234567', '+44 7911 123456', '06123456789'],
    },
    taxid: {
      // SIREN (9 digits, Luhn), SIRET (14 digits, Luhn), and TVA (FR + computed 2-digit key + 9-digit SIREN).
      valid: ['732829320', '73282932000074', 'FR44732829320'],
      invalid: ['12345678', '1234567890123456', 'FR123456789', 'FR14732829320'],
    },
  },
  formatters: {
    postalcode: [{ in: '75001', out: '75001' }],
    mobile: [
      { in: '612345678', options: { format: 'local' }, out: '06 12 34 56 78' },
      { in: '612345678', options: { format: 'international' }, out: '+33 6 12 34 56 78' },
    ],
    currency: [
      { in: 1234.56, out: '1 234,56 €' },
      { in: -1234.56, out: '-1 234,56 €' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '31/12/2020' }],
    licensePlate: [{ in: 'AA123BB', out: 'AA-123-BB' }],
  },
  parsers: {
    boolean: [
      { in: 'oui', out: true },
      { in: 'non', out: false },
      { in: 'true', out: true },
      { in: 'false', out: false },
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
