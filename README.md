# FormaJS

[![npm version](https://img.shields.io/npm/v/%40formajs%2Fformajs.svg)](https://www.npmjs.com/package/@formajs/formajs)
[![npm downloads](https://img.shields.io/npm/dm/%40formajs%2Fformajs.svg)](https://www.npmjs.com/package/@formajs/formajs)
[![license](https://img.shields.io/npm/l/%40formajs%2Fformajs.svg)](LICENSE.md)

A lightweight, modular JavaScript library for validating, parsing, and sanitizing form inputs — with built‑in internationalization (i18n), zero external dependencies, and an extensible rule system.

## Features

- Common validations out of the box: email, numbers, dates, UUID, IP, credit card, license plate, postal code/ZIP, tax IDs, and more
- Internationalization: localized messages and locale‑aware rules
- Extensible: add your own validators, parsers, and sanitizers
- Zero external dependencies and small, tree‑shakable modules

## Documentation

For detailed API documentation, including all available validators, parsers, sanitizers, and formatters with their options and usage examples, see:

- [Validators](docs/validators.md) — Email, URL, IP, credit cards, tax IDs, and more
- [Parsers](docs/parsers.md) — Convert strings to typed values
- [Sanitizers](docs/sanitizers.md) — Clean and normalize input data
- [Formatters](docs/formatters.md) — Apply locale-aware formatting

## Installation

```bash
npm install @formajs/formajs
# or
pnpm add @formajs/formajs
# or
yarn add @formajs/formajs
```

## Quick start

### 1) Use the preconfigured instance

```js
// Default export is a preconfigured instance with locale en-US
import forma from '@formajs/formajs';

const res = forma.validateEmail('john@example.com');
if (!res.valid) {
  console.error(res.message); // Localized message (en-US by default)
}
```

### 2) Switch locale or use a locale-specific instance (opt-in locales)

```js
import forma from '@formajs/formajs';

// Import the locale module you want to enable (opt-in)
// Available today: en-US (default), pt-BR, en-UK, es-ES, fr-FR, de-DE, zh-CN
import '@formajs/formajs/i18n/pt-BR';

// Change locale at runtime
forma.setLocale('pt-BR');

// Now your validations/messages are in pt-BR
const r = forma.validateTaxId('01234567890');
```

Or create a new instance with a specific locale:

```js
import { Forma } from '@formajs/formajs';
import '@formajs/formajs/i18n/pt-BR';

const f = new Forma('pt-BR');

// Now your validations/messages are in pt-BR
const r = f.validateTaxId('01234567890');
```

### 3) Use the class directly

```js
import { Forma } from '@formajs/formajs';

const f = new Forma('en-US');
const result = f.validateURL('https://example.com', { requireProtocol: true });
// result: { valid: boolean, message: string | null, error?: string, context?: object }
```

### 4) Call standalone functions (no message formatting)

All validators/parsers/sanitizers are also exported as standalone functions. These return raw results without localized messages — handy for frameworks or custom flows.

```js
import { validateEmail } from '@formajs/formajs/validators/validateEmail';

const r = validateEmail('bad@@example.com');
// r: { valid: false, error: 'validateEmail', context?: {...} }
```

> Tip: When called via the `Forma` instance, error codes are mapped to localized messages automatically.

## API overview

- Validation result shape (via instance):

  ```text
  { valid: true, message: null }
  { valid: false, message: string, error: string, context?: object }
  ```

- Options pattern: each rule accepts an optional final `options` object. When invoked through `Forma`, the instance `locale` is merged with your options.
- Async rules: the engine supports async validators; if a rule returns a Promise, the instance method returns a Promise too.

### Locales (i18n)

- Default locale: `en-US`
- Opt-in additional locales: import the locale module once in your app, e.g. `import '@formajs/formajs/i18n/pt-BR'`
- Change at runtime: `forma.setLocale('pt-BR')`
- Per-call override: pass `{ locale: 'pt-BR' }` as the last argument

Available locale modules today:

```js
import '@formajs/formajs/i18n/en-US'; // (English - USA) already preloaded by default
import `@formajs/formajs/i18n/de-DE` // German - Germany
import `@formajs/formajs/i18n/en-AU` // English - Australia
import `@formajs/formajs/i18n/en-CA` // English - Canada
import `@formajs/formajs/i18n/en-IN` // English - India
import `@formajs/formajs/i18n/en-UK` // English - UK
import `@formajs/formajs/i18n/es-AR` // Spanish - Argentina
import `@formajs/formajs/i18n/es-ES` // Spanish - Spain
import `@formajs/formajs/i18n/es-MX` // Spanish - Mexico
import `@formajs/formajs/i18n/fr-CA` // French - Canada
import `@formajs/formajs/i18n/fr-FR` // French - France
import `@formajs/formajs/i18n/it-IT` // Italian - Italy
import `@formajs/formajs/i18n/ja-JP` // Japanese - Japan
import `@formajs/formajs/i18n/pt-BR` // Portuguese - Brazil
import `@formajs/formajs/i18n/pt-PT` // Portuguese - Portugal
import `@formajs/formajs/i18n/tr-TR` // Turkish - Turkey
import `@formajs/formajs/i18n/zh-CN` // Chinese - China
```

Notes:

- Locales are opt-in to keep bundles small. Only `en-US` ships preloaded by default.
- If you rely on the i18n utilities directly, you can also use the named exports: `registerLocale`, `getLocaleData`, `hasLocale` from `@formajs/formajs/i18n`.

## Modules and examples

For a complete reference of all available validators, parsers, sanitizers, and formatters with their options and examples, see the [detailed documentation in the docs/ folder](docs/).

### Validators

Examples (see `src/validators/` for the full list):

```js
forma.validateEmail('user@example.com');
forma.validateURL('https://example.com', { requireProtocol: true });
forma.validateIP('127.0.0.1');
forma.validateDate('2024-01-31');
forma.validateCreditCard('4111111111111111');
```

Direct import (tree‑shakable):

```js
import { validateURL } from '@formajs/formajs/validators/validateURL';
validateURL('example.com', { requireProtocol: false });
```

### Sanitizers

Common sanitizers (see `src/sanitizers/`):

```js
forma.trim('  hello  '); // 'hello'
forma.escapeHTML('<b>x</b>'); // '&lt;b&gt;x&lt;/b&gt;'
forma.normalizeEmail('Foo+bar@GMAIL.com');
```

### Formatters

Apply locale-aware formatting to data (see `src/formatters/`):

```js
forma.formatPostalCode('09010140', { locale: 'pt-BR' }); // '09010-140'
forma.formatPostalCode('90210', { locale: 'en-US' }); // '90210'
```

Direct import:

```js
import { formatPostalCode } from '@formajs/formajs/formatters/formatPostalCode';
formatPostalCode('09010140', { locale: 'pt-BR' });
```

### Parsers

Turn strings into typed values (see `src/parsers/`):

```js
forma.toInt('42'); // 42
forma.toFloat('3.14'); // 3.14
forma.toDate('2024-01-31'); // Date
```

## Import styles, deep imports, and CDN

FormaJS ships multiple formats in `dist/` and supports deep imports for optimal bundling:

```js
// ESM
import forma, { Forma } from '@formajs/formajs';
import { validateEmail } from '@formajs/formajs/validators/validateEmail';
// Opt-in a locale
import '@formajs/formajs/i18n/pt-BR';
```

```js
// CJS
const forma = require('@formajs/formajs').default;
const { validateEmail } = require('@formajs/formajs/validators/validateEmail');
// Opt-in a locale
require('@formajs/formajs/i18n/pt-BR');
```

```html
<!-- UMD (Browser/CDN) -->
<script src="https://unpkg.com/@formajs/formajs@1/dist/formajs.umd.min.js"></script>
<script>
  // The global remains forma (defined in the UMD build)
  // UMD includes en-US by default. Additional locales are available via ESM/CJS builds.
  forma.validateEmail('john@example.com');
  // To use other locales on the web, prefer a bundler setup (ESM) and import the locale module.
  // In pure script tag usage, you can pass `{ locale: 'pt-BR' }` per call, but messages won't be localized unless the locale data is registered.
  // See ESM/CJS examples above for enabling locales.
</script>
```

> Deep imports are enabled via `package.json#exports` for validators, sanitizers, and parsers.

## Project scripts

See the scripts in [package.json](package.json). Highlights:

- Run tests: `npm run test`
- Watch tests: `npm run test:watch`
- Coverage: `npm run test:coverage`
- Lint: `npm run lint`
- Format: `npm run format`
- Build: `npm run build`
- Quick check (format + lint): `npm run check`
- Generate docs tables (experimental): `npm run docs`

Coverage reports are written to `coverage/`; open `coverage/lcov-report/index.html` in your browser.

## Contributing

Please read the full guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

Pull requests are welcome—tests, docs, and clear rationale help us review faster.

---

## Migration notes (breaking)

Starting in v1.2.0, locales are opt-in and the `formaBR` named export was removed to reduce bundle size.

What changed:

- Only `en-US` is preloaded by default.
- To enable another locale, import its module once in your app.
- The `formaBR` export no longer exists.

How to migrate:

```diff
- import { forma, formaBR } from '@formajs/formajs';
+ import forma from '@formajs/formajs';
+ import '@formajs/formajs/i18n/pt-BR';

- const r = formaBR.validateTaxId('01234567890');
+ forma.setLocale('pt-BR');
+ const r = forma.validateTaxId('01234567890');
```

Or create a dedicated instance:

```js
import { Forma } from '@formajs/formajs';
import '@formajs/formajs/i18n/pt-BR';

const br = new Forma('pt-BR');
```

## License

MIT © FormaJS — see [LICENSE.md](LICENSE.md)
