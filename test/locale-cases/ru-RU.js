export const ruRUCases = {
  locale: 'ru-RU',
  validate: {
    alpha: {
      valid: ['Москва', 'СанктПетербург', 'Иванов', 'АБВГД'],
      invalid: ['Москва1', 'Иванов@', '123', 'Test!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'Тест123', 'RU2025', 'Номер1'],
      invalid: ['A1B 2C3', 'Тест@123', 'Пробел 123', ''],
    },
    postalcode: {
      valid: ['101000', '190000', '350000', '123456'],
      invalid: ['10100', 'абвгде', '12345', '1234567'],
    },
    boolean: {
      valid: ['да', 'нет', 'true', 'false', '1', '0'],
      invalid: ['maybe', 'sí', 'oui', '2'],
    },
    date: {
      valid: ['31.12.2020', '01.01.2021', '15.06.2022'],
      invalid: ['2020/12/31', '12-31-2020', 'invalid', '32.01.2020'],
    },
    mobilenumber: {
      valid: ['(495) 123-45-67', '+7 (495) 123-45-67', '9031234567', '(903) 123-45-67'],
      invalid: ['012-345-6789', '1234567', '+44 20 7946 0958', '495123'],
    },
    taxid: {
      valid: ['7736674153', '770523964959', '1264921554996', '349382438549106'],
      invalid: ['123456789', 'abcdefghij', '0000000000', '12345678901234'],
    },
  },
  formatters: {
    postalcode: [{ in: '101000', out: '101000' }],
    mobile: [
      { in: '4951234567', options: { format: 'local' }, out: '(495) 123-45-67' },
      { in: '4951234567', options: { format: 'international' }, out: '+7 (495) 123-45-67' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '31.12.2020' }],
    taxid: [
      { in: '7736674153', options: { type: 'INN' }, out: '7736674153' },
      { in: '1264921554996', options: { type: 'OGRN' }, out: '1264921554996' },
    ],
  },
  parsers: {
    boolean: [
      { in: 'да', out: true },
      { in: 'нет', out: false },
      { in: 'true', out: true },
      { in: 'false', out: false },
    ],
    float: [{ in: '1 234,56', out: 1234.56 }],
    int: [{ in: '1 234', out: 1234 }],
    date: [
      { in: '31.12.2020', out: new Date(Date.UTC(2020, 11, 31)) },
      { in: '2020-12-31', out: null },
    ],
  },
};
