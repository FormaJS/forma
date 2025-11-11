export const enCACases = {
  locale: 'en-CA',
  validate: {
    alpha: {
      valid: ['Quebec', 'Toronto', 'Vancouver', 'Montreal'],
      invalid: ['Québec', 'Toronto1', '123', 'Mont-réal'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'Test123', 'abc456XYZ', '000AAA'],
      invalid: ['A1B 2C3', 'Test@123', 'abc_456', 'hello world'],
    },
    postalcode: {
      valid: ['K1A0B1', 'K1A 0B1', 'M5V3A8', 'V6B1A1'],
      invalid: ['K1A-0B1', '111111', '12345', 'ABCDEF'],
    },
    mobile: {
      valid: ['(416) 555-1234', '+1 (416) 555-1234', '14165551234', '4165551234'],
      invalid: ['(016) 555-1234', '123456', '11111111111', '+44 20 7946 0958'],
    },
    taxid: {
      valid: ['046 454 286', '046454286', '193456787'],
      invalid: ['046 454 287', '111111111', '000000000', '12345678'],
    },
    licensePlate: {
      valid: ['ABCD-123', 'WXYZ123', 'TEST-000'],
      invalid: ['ABC 123', 'AB 1234', 'ABCDE 12', '12 ABCD', 'ABC-1234'],
    },
  },
  formatters: {
    postalcode: [
      { in: 'K1A0B1', out: 'K1A 0B1' },
      { in: 'M5V3A8', out: 'M5V 3A8' },
    ],
    mobile: [
      { in: '4165551234', options: { format: 'local' }, out: '(416) 555-1234' },
      { in: '4165551234', options: { format: 'international' }, out: '+1 (416) 555-1234' },
    ],
    currency: [
      { in: 1234.56, out: '$1,234.56' },
      { in: -1234.56, out: '-$1,234.56' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '12/31/2020' }],
    licensePlate: [{ in: 'ABCD123', out: 'ABCD-123' }],
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
      { in: '02/30/2020', out: null },
      { in: 'not a date', out: null },
    ],
  },
};
