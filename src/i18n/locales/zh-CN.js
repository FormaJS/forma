import zhCN from '../lang/zh-CN.json';
import { registerLocale } from '../index.js';

// Auto-register zh-CN locale when this module is imported
registerLocale('zh-CN', zhCN);
