export const zhCNCases = {
  locale: 'zh-CN',
  validate: {
    alpha: {
      valid: ['北京', '上海', '广州', '深圳'],
      invalid: ['北京1', '上海@', '123', '深圳!'],
    },
    alphanumeric: {
      valid: ['北京123', '上海2024', '测试456', '中国2025'],
      invalid: ['北京 123', '上海@123', '测试_456', '中国-2024'],
    },
    postalcode: {
      valid: ['100000', '200000', '510000', '518000'],
      invalid: ['10000', '1000000', 'ABCDEF', '100-000'],
    },
    mobile: {
      valid: ['+86 138 1234 5678', '13812345678', '15912345678', '+8613912345678'],
      invalid: ['12812345678', '1381234567', '+1 416 555 1234', '138123456789'],
    },
    boolean: {
      valid: ['真', '假', 'true', 'false', '1', '0', '是', '否'],
      invalid: ['maybe', 'sim', 'yes', '2', '对错'],
    },
    date: {
      valid: ['2020/12/31', '2021/01/01', '2022/06/15'],
      invalid: ['31/12/2020', '12-31-2020', '2020/13/01', 'invalid'],
    },
    decimal: {
      valid: ['1234.56', '0.5', '1,234.56', '-123.45'],
      invalid: ['1234,56', 'abc', '12.34.56', ''],
    },
    currency: {
      valid: ['¥1,234.56', '¥1234.56', '-¥1,234.56', '¥0.99'],
      invalid: ['1234.56', '$1234', 'R$1234', '¥abc'],
    },
    licensePlate: {
      valid: ['京A12345', '沪B67890', '粤C12345', '川A88888'],
      invalid: ['京12345', 'ABC1234', '京AI1234', '京A1234'],
    },
    taxid: {
      // USCC examples with valid check codes
      valid: ['91110000600037341L', '91310000633576064R', '91440300708461136T'],
      invalid: ['91110000600037341X', '9131000063357606', '91440300708461136', 'ABCD1234567890'],
    },
  },
  formatters: {
    postalcode: [{ in: '100000', out: '100000' }],
    mobile: [
      { in: '13812345678', options: { format: 'local' }, out: '138 1234 5678' },
      { in: '13812345678', options: { format: 'international' }, out: '+86 138 1234 5678' },
    ],
    currency: [
      { in: 1234.56, out: '¥1,234.56' },
      { in: -1234.56, out: '-¥1,234.56' },
    ],
    date: [{ in: new Date(Date.UTC(2020, 11, 31)), out: '2020/12/31' }],
    taxid: [
      { in: '91110000600037341L', options: { type: 'USCC' }, out: '9111 0000 6000 3734 1L' },
      { in: '91310000633576064R', options: { type: 'USCC' }, out: '9131 0000 6335 7606 4R' },
    ],
  },
  parsers: {
    boolean: [
      { in: '真', out: true },
      { in: '假', out: false },
      { in: 'true', out: true },
      { in: 'false', out: false },
    ],
    float: [{ in: '1,234.56', out: 1234.56 }],
    int: [{ in: '1,234', out: 1234 }],
    date: [
      { in: '2020/12/31', out: new Date(Date.UTC(2020, 11, 31)) },
      { in: '2021/01/01', out: new Date(Date.UTC(2021, 0, 1)) },
      { in: '2022/06/15', out: new Date(Date.UTC(2022, 5, 15)) },
      { in: '31/12/2020', out: null },
      { in: '2020/02/31', out: null },
      { in: 'not a date', out: null },
    ],
  },
};
