import jaJP from '../lang/ja-JP.json';
import { registerLocale } from '../index.js';

// Auto-register ja-JP locale when this module is imported
registerLocale('ja-JP', jaJP);
