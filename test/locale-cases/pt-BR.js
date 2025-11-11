export const ptBRCases = {
  locale: 'pt-BR',
  validate: {
    alpha: {
      valid: ['São', 'João', 'Conceição', 'José'],
      invalid: ['São1', 'João@', '123', 'José!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'São123', 'Test456', 'Brasil2024'],
      invalid: ['A1B 2C3', 'São@123', 'Test_456', 'Brasil-2024'],
    },
    postalcode: {
      valid: ['01310-100', '01310100', '20040-020', '30130100'],
      invalid: ['0131-100', '123', '12345', '01310-10'],
    },
    boolean: {
      valid: ['sim', 'não', 'true', 'false', '1', '0', 's', 'n'],
      invalid: ['maybe', 'oui', 'yes', '2', 'SIM', 'NÃO'],
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
      valid: ['R$ 1.234,56', 'R$ 1234,56', 'R$1234,56', 'R$ 0,99'],
      invalid: ['1234,56', '$1234', '€1234', 'R$abc'],
    },
    licensePlate: {
      valid: ['ABC1D23', 'ABC-1234', 'XYZ 9876'],
      invalid: ['AB1D23', 'ABCD123', '123ABC', 'ABC-12345'],
    },
    mobilenumber: {
      valid: ['(11) 98765-4321', '+55 (11) 98765-4321', '11987654321', '11 98765-4321'],
      invalid: ['(00) 98765-4321', '1234567', '99999999999', '+44 20 7946 0958'],
    },
    taxid: {
      valid: ['01006735038', '111.444.777-35', '11444777000161', '11.444.777/0001-61'],
      invalid: ['11111111111', '22222222222', '12345678900', '11444777000160'],
    },
  },
  formatters: {
    postalcode: [{ in: '01310100', out: '01310-100' }],
    mobile: [
      { in: '11987654321', options: { format: 'local' }, out: '(11) 98765-4321' },
      { in: '11987654321', options: { format: 'international' }, out: '+55 (11) 98765-4321' },
    ],
    currency: [
      { in: 1234.56, out: 'R$ 1.234,56' },
      { in: -1234.56, out: '- R$ 1.234,56' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '31/12/2020' }],
    licensePlate: [
      { in: 'ABC1D23', out: 'ABC-1D23' },
      { in: 'ABC1234', out: 'ABC-1234' },
    ],
    taxid: [
      { in: '12345678901', options: { type: 'CPF' }, out: '123.456.789-01' },
      { in: '12345678000199', options: { type: 'CNPJ' }, out: '12.345.678/0001-99' },
    ],
  },
  parsers: {
    boolean: [
      { in: 'sim', out: true },
      { in: 'não', out: false },
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
