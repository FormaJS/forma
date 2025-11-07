// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./test/setup.js'],
    coverage: {
      provider: 'v8', // 'v8' ou 'istanbul'
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**'],
      exclude: ['src/**/*.test.js'],
      thresholds: { lines: 80, branches: 70 },
    },
    // globals: false,
  },
});
