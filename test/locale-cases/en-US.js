export const enUSCases = {
  locale: 'en-US',
  validate: {
    alpha: {
      valid: ['NewYork', 'LosAngeles', 'Chicago', 'Houston'],
      invalid: ['New York', 'Los Angeles1', '123', 'Houston!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'Test123', 'NYC2024', 'ABC123XYZ'],
      invalid: ['A1B 2C3', 'Test@123', 'NYC-2024', 'ABC_123'],
    },
    postalcode: {
      valid: ['12345', '90210', '10001-1234', '94102-1234'],
      invalid: ['1234', '123456', 'ABCDE', '12345-12'],
    },
    mobile: {
      valid: ['(212) 555-1234', '+1 (212) 555-1234', '2125551234', '1-212-555-1234'],
      invalid: ['(012) 555-1234', '123456', '11111111111', '+44 20 7946 0958'],
    },
    boolean: {
      valid: ['yes', 'no', 'true', 'false', '1', '0', 'y', 'n'],
      invalid: ['maybe', 'oui', 'sim', '2', 'YES', 'NO'],
    },
    date: {
      valid: ['12/31/2020', '01/01/2021', '06/15/2022'],
      invalid: ['2020-12-31', '31/12/2020', '13/01/2020', 'invalid'],
    },
    decimal: {
      valid: ['1234.56', '0.5', '1,234.56', '-123.45'],
      invalid: ['1234,56', 'abc', '12.34.56', ''],
    },
    currency: {
      valid: ['$1,234.56', '$1234.56', '-$1,234.56', '$0.99'],
      invalid: ['1234.56', 'R$1234', '€1234', '$abc'],
    },
    taxid: {
      // Remove invalid SSN (area >= 900). Add ITIN example.
      valid: ['123-45-6789', '12-3456789', '912-70-0000'],
      invalid: ['123-45-678', '000-00-0000', '666-00-0000', '987-65-4321'],
    },
    licensePlate: {
      // State-aware samples: each object carries the state code for validation.
      valid: [
        { plate: '1ABC123', state: 'CA' }, // CA pattern [1-9][A-Z]{3}[0-9]{3}
        { plate: 'ABC1234', state: 'GA' }, // GA pattern [A-Z]{3}[0-9]{4}
        { plate: 'AAA-1234', state: 'NY' }, // NY pattern [A-Z]{3}-?[0-9]{4}
        { plate: 'XYZ4567', state: 'TX' }, // TX pattern [A-Z]{3}[0-9]{4}
      ],
      invalid: [
        { plate: '0ABC123', state: 'CA' }, // starts with 0 not allowed in CA
        { plate: 'AB1234', state: 'GA' }, // only 2 letters
        { plate: 'AAAA-1234', state: 'NY' }, // 4 letters prefix invalid for NY pattern
        { plate: 'XYZ-9876', state: 'TX' }, // dash not allowed in TX pattern
      ],
    },
  },
  formatters: {
    postalcode: [{ in: '12345', out: '12345' }],
    mobile: [
      { in: '2125551234', options: { format: 'local' }, out: '(212) 555-1234' },
      { in: '2125551234', options: { format: 'international' }, out: '+1 (212) 555-1234' },
    ],
    currency: [
      { in: 1234.56, out: '$1,234.56' },
      { in: -1234.56, out: '-$1,234.56' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '12/31/2020' }],
    taxid: [
      { in: '123456789', options: { type: 'SSN' }, out: '123-45-6789' },
      { in: '123456789', options: { type: 'EIN' }, out: '12-3456789' },
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
      { in: '12/31/2020', out: new Date(Date.UTC(2020, 11, 31)) },
      { in: '01/01/2021', out: new Date(Date.UTC(2021, 0, 1)) },
      { in: '06/15/2022', out: new Date(Date.UTC(2022, 5, 15)) },
      { in: '31/12/2020', out: null },
      { in: '13/01/2020', out: null },
      { in: 'not a date', out: null },
    ],
  },
};
