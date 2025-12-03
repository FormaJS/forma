export const enINCases = {
  locale: 'en-IN',
  validate: {
    alpha: {
      valid: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai'],
      invalid: ['Delhi1', 'Mumbai@', '123', 'Chennai!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'Test123', 'Mumbai2024', 'ABC123XYZ'],
      invalid: ['A1B 2C3', 'Test@123', 'Mumbai-2024', 'ABC_123'],
    },
    postalcode: {
      valid: ['560001', '110001', '400001', '600001'],
      invalid: ['56001', '11000', '12345678', 'ABCDEF'],
    },
    mobile: {
      valid: ['+91 9876543210', '9876543210'],
      invalid: ['1234567890', '0123456789', '+1 416 555 1234', '123'],
    },
    taxid: {
      valid: ['ABCPX1234F', '27ABCPX1234F1ZS', 'XYZPA9876K'],
      invalid: ['ABCQX1234F', '00ABCPX1234F1ZS', 'ABC1234567', '27ABCPX1234F1Z'],
    },
    boolean: {
      valid: ['yes', 'no', 'true', 'false', '1', '0'],
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
      valid: ['₹1,234.56', '₹1234.56', '₹0.99'],
      invalid: ['1234.56', '$1234', '€1234', '₹abc'],
    },
    licensePlate: {
      valid: ['DL 01 AB 1234', 'MH-12-XY-5678', 'KA01AA1234'],
      invalid: ['DL01', 'AB1234', 'MH 123 XY 5678', '1234ABCD'],
    },
  },
  formatters: {
    postalcode: [{ in: '560001', out: '560001' }],
    mobile: [
      { in: '9876543210', options: { format: 'local' }, out: '98765-43210' },
      { in: '9876543210', options: { format: 'international' }, out: '+91 98765-43210' },
    ],
    currency: [
      { in: 1234.56, out: '₹1,234.56' },
      { in: -1234.56, out: '-₹1,234.56' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '31/12/2020' }],
    taxid: [
      { in: 'ABCPX1234F', options: { type: 'PAN' }, out: 'ABCPX1234F' },
      { in: '27ABCPX1234F1ZS', options: { type: 'GSTIN' }, out: '27ABCPX1234F1ZS' },
    ],
  },
  parsers: {
    boolean: [
      { in: 'yes', out: true },
      { in: 'no', out: false },
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
