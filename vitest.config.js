// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./test/setup.js'],
    coverage: {
      provider: 'v8', // 'v8' ou 'istanbul'
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**'],
      exclude: [
        'src/**/*.test.js',
        'src/umd-entry.js',
        'src/i18n/lang/**/*',
        'src/validators/validateTaxId/i18n/**/*',
        'src/validators/validateTaxId/index.js',
        'src/validators/validateEmail/index.js',
        'src/validators/validateCreditCard/index.js',
        'src/utils/executeI18nValidationRule/index.js',
        'src/formatters/index.js',
        'src/sanitizers/index.js',
        'src/parsers/index.js',
        'src/validators/index.js',
        'src/utils/index.js',
        '**/.DS_Store',
      ],
      thresholds: { lines: 80, branches: 70 },
    },
    // globals: false,
  },
});
