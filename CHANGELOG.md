# Changelog

All notable changes to this package will be documented in this file.

## [v2.0.0] - 2025-11-06

This release focuses on significantly reducing the published package size and making i18n locales opt-in. It also removes the legacy `formaBR` export.

### Breaking changes

- Locales are now opt-in. Only `en-US` is preloaded by default. To use another locale you must import its module once in your app (ESM/CJS):
  - ESM: `import '@formajs/formajs/i18n/pt-BR'`
  - CJS: `require('@formajs/formajs/i18n/pt-BR')`
- The named export `formaBR` was removed. Use the default instance with `setLocale('pt-BR')` or create a new `Forma('pt-BR')` after importing the locale module.

### Added

- i18n registry and per-locale wrapper modules that self-register on import:
  - `@formajs/formajs/i18n/en-US` (English - USA) - Default
  - `@formajs/formajs/i18n/de-DE` (German - Germany)
  - `@formajs/formajs/i18n/en-AU` (English - Australia)
  - `@formajs/formajs/i18n/en-CA` (English - Canada)
  - `@formajs/formajs/i18n/en-IN` (English - India)
  - `@formajs/formajs/i18n/en-UK` (English - UK)
  - `@formajs/formajs/i18n/es-AR` (Spanish - Argentina)
  - `@formajs/formajs/i18n/es-ES` (Spanish - Spain)
  - `@formajs/formajs/i18n/es-MX` (Spanish - Mexico)
  - `@formajs/formajs/i18n/fr-CA` (French - Canada)
  - `@formajs/formajs/i18n/fr-FR` (French - France)
  - `@formajs/formajs/i18n/it-IT` (Italian - Italy)
  - `@formajs/formajs/i18n/ja-JP` (Japanese - Japan)
  - `@formajs/formajs/i18n/pt-BR` (Portuguese - Brazil)
  - `@formajs/formajs/i18n/pt-PT` (Portuguese - Portugal)
  - `@formajs/formajs/i18n/ru-RU` (Russian - Russia)
  - `@formajs/formajs/i18n/tr-TR` (Turkish - Turkey)
  - `@formajs/formajs/i18n/zh-CN` (Chinese - China)

### Changed

- Build outputs simplified for better tree-shaking:
  - Keep UMD bundle for browsers: `dist/formajs.umd.min.js` (global `forma`).
  - ESM and CJS are preserved modules under `dist/esm` and `dist/cjs`.
- `package.json` exports updated to point to preserved modules and to expose locale subpaths under `./i18n/...`.
- `sideEffects` tuned to preserve the side-effectful locale wrapper modules during bundling.
- Examples/docs updated to use the scoped package name `@formajs/formajs` and deep-imports like `@formajs/formajs/validators/validateEmail`.

### Removed

- Monolithic ESM/CJS bundles (the preserved modules supersede them).
- `formaBR` named export and its UMD exposure.

### Fixed

- Test suite updated to explicitly register locales in the test setup; all tests pass under the new opt-in model.

### Performance & package size

- Drastic size reduction by removing duplicated bundles and making locales opt-in.
- Current measurements (npm pack --dry-run):
  - Tarball size: ~91.7 kB
  - Unpacked size: ~391.4 kB
  - UMD bundle: ~64.3 kB (minified)

> Note: Previous baselines were significantly larger due to bundled locales and duplicate outputs.

### Migration guide

Replace usages of `formaBR` and import the locale module you need.

- From:

```diff
- import { forma, formaBR } from '@formajs/formajs';
- const r = formaBR.validateTaxId('01234567890');
```

- To (default instance):

```diff
+ import forma from '@formajs/formajs';
+ import '@formajs/formajs/i18n/pt-BR';
+
+ forma.setLocale('pt-BR');
+ const r = forma.validateTaxId('01234567890');
```

- Or create a dedicated instance:

```js
import { Forma } from '@formajs/formajs';
import '@formajs/formajs/i18n/pt-BR';

const formaBR = new Forma('pt-BR');
```

### Usage reminders

- ESM:

```js
import forma, { Forma } from '@formajs/formajs';
import '@formajs/formajs/i18n/pt-BR';
forma.setLocale('pt-BR');
```

- CJS:

```js
const forma = require('@formajs/formajs').default;
require('@formajs/formajs/i18n/pt-BR');
forma.setLocale('pt-BR');
```

- Deep imports remain available and tree-shakable:

```js
import { validateEmail } from '@formajs/formajs/validators/validateEmail';
```

---

## [v1.1.0] - 2025-11-04

New Formatters (`formatters/`)

- `formatCurrency`: Converts a number (e.g., `1234.50`) into a locale-aware currency string (e.g., "R$ 1.234,56" or "$1,234.50").
- `formatDate`: Converts a `Date` object into a formatted string (e.g., "31/10/2025") using the new `masks.date` rule from i18n.
- `formatPostalCode`: Formats ZIP/Postal code digits (e.g., "01001000") into the locale's mask (e.g., "01001-000").
- `formatMobileNumber`: Formats mobile number digits using the `local` or `international` masks (e.g., "+55 (11) 98765-4321").
- `formatTaxId`: Formats a Tax ID (CPF, CNPJ, SSN) using the `option.type` to select the correct mask (e.g., "###.###.###-##").

Architectural Improvements (Formatter Support)

- The locale files (e.g., `pt-BR.json` and `en-US.json`) now contain a centralized `masks` object, which defines the formats for `postalcode`, `mobileNumber`, `date`, and `taxId`.
- The `applyFormatMask` utility was added to apply format masks consistently.

New Sanitizers (`sanitizers/`)

- Added the `padStart` and `padEnd` sanitizers. They are essential utilities, perfect for preparing data before formatting (e.g., adding leading zeros to a CPF before calling `formatTaxId`).

## [v1.0.0] - 2025-11-03

First public release of FormaJS — a lightweight, modular library for validation, parsing, sanitization, and formatting of inputs, with built-in i18n and zero external dependencies.
