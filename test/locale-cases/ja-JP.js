export const jaJPCases = {
  locale: 'ja-JP',
  validate: {
    alpha: {
      valid: ['東京', '大阪', '佐藤', '鈴木'],
      invalid: ['東京1', '大阪@', '123', '鈴木!'],
    },
    alphanumeric: {
      valid: ['A1B2C3', 'テスト123', 'JP2025', '番号1'],
      invalid: ['A1B 2C3', 'テスト@123', 'スペース 123', ''],
    },
    postalcode: {
      valid: ['100-0001', '150-0002', '060-0000', '1600004'],
      invalid: ['100000', 'abc-defg', '12345', '1000-000'],
    },
    boolean: {
      valid: ['はい', 'いいえ', 'true', 'false', '1', '0'],
      invalid: ['maybe', 'sí', 'oui', '2'],
    },
    date: {
      valid: ['2020/12/31', '2021/01/01', '2022/06/15'],
      invalid: ['31/12/2020', '12-31-2020', 'invalid', '2020/13/01'],
    },
    mobilenumber: {
      valid: ['090-1234-5678', '+81 90-1234-5678', '0312345678', '080-9999-9999'],
      invalid: ['012-345-6789', '1234567', '+44 20 7946 0958', '090123456'],
    },
    taxid: {
      valid: ['599117194225', '6560105696489'],
      invalid: ['12345678901', 'abcdefghijk', '000000000000'],
    },
  },
  formatters: {
    postalcode: [{ in: '1000001', out: '100-0001' }],
    mobile: [
      { in: '09012345678', options: { format: 'local' }, out: '090-1234-5678' },
      { in: '09012345678', options: { format: 'international' }, out: '+81 90-1234-5678' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '2020/12/31' }],
    taxid: [
      { in: '599117194225', options: { type: 'MyNumber' }, out: '599117194225' },
      { in: '6560105696489', options: { type: 'Corporate' }, out: '6560105696489' },
    ],
  },
  parsers: {
    boolean: [
      { in: 'はい', out: true },
      { in: 'いいえ', out: false },
      { in: 'true', out: true },
      { in: 'false', out: false },
    ],
    float: [{ in: '1,234.56', out: 1234.56 }],
    int: [{ in: '1,234', out: 1234 }],
    date: [
      { in: '2020/12/31', out: new Date(Date.UTC(2020, 11, 31)) },
      { in: '2020-12-31', out: null },
    ],
  },
};
