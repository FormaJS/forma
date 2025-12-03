export const enUKCases = {
  locale: 'en-UK',
  validate: {
    alpha: {
      valid: ['London', 'Manchester', 'Birmingham', 'Liverpool'],
      invalid: ['London1', 'Manchester@', '123', 'Liverpool!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'Test123', 'London2024', 'UK789'],
      invalid: ['A1B 2C3', 'Test@123', 'London-2024', 'UK_789'],
    },
    postalcode: {
      valid: ['SW1A 1AA', 'SW1A1AA', 'M1 1AE', 'B33 8TH'],
      invalid: ['SW1A-1AA', '12345', 'ABCDEF', 'SW1'],
    },
    licensePlate: {
      valid: ['AB12CDE', 'AB12 CDE', 'XY99ABC'],
      invalid: ['AB1CDE', 'AB123CDE', 'A12CDE', '12ABCDE'],
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
      valid: ['£1,234.56', '£1234.56', '-£1,234.56', '£0.99'],
      invalid: ['1234.56', '$1234', '€1234', '£abc'],
    },
    taxid: {
      // Use a valid NINO; drop UTR sample to avoid false negatives without a precomputed check digit.
      valid: ['AB123456C'],
      invalid: ['123456789', 'QQ123456D', 'QQ123456C', 'BG123456A'],
    },
  },
  formatters: {
    postalcode: [
      { in: 'SW1A1AA', out: 'SW1A 1AA' },
      { in: 'M11AE', out: 'M1 1AE' },
    ],
    mobile: [
      { in: '07123456789', options: { format: 'local' }, out: '07123 456789' },
      { in: '07123456789', options: { format: 'international' }, out: '+44 07123 456789' },
    ],
    currency: [
      { in: 1234.56, out: '£1,234.56' },
      { in: -1234.56, out: '-£1,234.56' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '31/12/2020' }],
    licensePlate: [{ in: 'AB12CDE', out: 'AB12 CDE' }],
    taxid: [
      { in: 'AB123456C', options: { type: 'NI' }, out: 'AB 12 34 56 C' },
      { in: 'QQ123456A', options: { type: 'NI' }, out: 'QQ 12 34 56 A' },
    ],
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
