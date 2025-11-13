// setup.js para testes dos sanitizers
import { beforeEach, afterEach } from 'vitest';
// Register locales
import '../src/i18n/locales/de-DE.js';
import '../src/i18n/locales/en-AU.js';
import '../src/i18n/locales/en-CA.js';
import '../src/i18n/locales/en-IN.js';
import '../src/i18n/locales/en-UK.js';
import '../src/i18n/locales/es-AR.js';
import '../src/i18n/locales/es-ES.js';
import '../src/i18n/locales/es-MX.js';
import '../src/i18n/locales/fr-CA.js';
import '../src/i18n/locales/fr-FR.js';
import '../src/i18n/locales/it-IT.js';
import '../src/i18n/locales/ja-JP.js';
import '../src/i18n/locales/pt-BR.js';
import '../src/i18n/locales/pt-PT.js';
import '../src/i18n/locales/tr-TR.js';
import '../src/i18n/locales/zh-CN.js';

beforeEach(() => {
  // Setup global para testes, se necessário
});

afterEach(() => {
  // Limpeza global após cada teste, se necessário
});
