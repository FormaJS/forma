export const frCACases = {
  locale: 'fr-CA',
  validate: {
    alpha: {
      valid: ['Québec', 'Montréal', 'TroisRivières', 'École'],
      invalid: ['Québec1', 'Montréal@', '123', 'École!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'Test123', 'Quebec2024', 'FRCA789'],
      invalid: ['A1B 2C3', 'Test@123', 'Quebec-2024', 'FR_CA_789'],
    },
    postalcode: {
      valid: ['H2X1Y4', 'K1A0B1', 'G1A 0A2', 'H2X 1Y4'],
      invalid: ['H2X-1Y4', '111111', '12345', 'ABCDEF'],
    },
    licensePlate: {
      valid: ['ABCD-123', 'WXYZ123', 'TEST-000'],
      invalid: ['ABC 123', 'AB 1234', 'ABCDE 12', '12 ABCD', 'ABC-1234'],
    },
    boolean: {
      valid: ['oui', 'non', 'vrai', 'faux', 'true', 'false', '1', '0'],
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
      valid: ['$1,234.56', '$1234.56', '-$1,234.56', '$0.99'],
      invalid: ['1234.56', 'R$1234', '€1234', '$abc'],
    },
    mobile: {
      valid: ['(418) 555-1234', '+1 (418) 555-1234', '4185551234'],
      invalid: ['(018) 555-1234', '1234567890', '+44 20 7946 0958', '418555'],
    },
    taxid: {
      valid: ['046 454 286', '046454286', '193456787'],
      invalid: ['046 454 287', '111111111', '000000000', '12345678'],
    },
  },
  formatters: {
    postalcode: [
      { in: 'H2X1Y4', out: 'H2X 1Y4' },
      { in: 'K1A0B1', out: 'K1A 0B1' },
    ],
    mobile: [
      { in: '4185551234', options: { format: 'local' }, out: '(418) 555-1234' },
      {
        in: '4185551234',
        options: { format: 'international' },
        out: '+1 (418) 555-1234',
      },
    ],
    currency: [
      { in: 1234.56, out: '$1,234.56' },
      { in: -1234.56, out: '-$1,234.56' },
    ],
    // Adjust to locale date format dd/mm/yyyy as defined in fr-CA i18n
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '31/12/2020' }],
    licensePlate: [{ in: 'ABCD123', out: 'ABCD-123' }],
  },
  parsers: {
    boolean: [
      { in: 'vrai', out: true },
      { in: 'faux', out: false },
      { in: 'oui', out: true },
      { in: 'non', out: false },
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
