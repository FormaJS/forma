# Testing Guide for @formajs/formajs

This document describes the testing strategy and how to add tests when contributing new locales or features.

## Test Structure

The test suite is organized into:

- **Unit tests** (per validator/formatter/sanitizer): `test/validators/`, `test/formatters/`, `test/sanitizers/`
- **Locale smoke tests** (generic runner): `test/locales.spec.test.js` + `test/locales.cases.js`
- **Global validator tests** (non-locale-specific): `test/globals.spec.test.js` + `test/globals.cases.js`
- **Setup**: `test/setup.js` registers all opt-in locales so they are available during tests

## Test Files Overview

| File                        | Purpose                                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------- |
| `test/locales.cases.js`     | Test cases for locale-specific validators (alpha, alphanumeric, postalcode, mobile, taxid, boolean) |
| `test/locales.spec.test.js` | Generic test runner that iterates through locale cases                                              |
| `test/globals.cases.js`     | Test cases for global validators (isHexadecimal, isBIC, isUUID, etc.)                               |
| `test/globals.spec.test.js` | Test runner for global validators                                                                   |
| `test/setup.js`             | Registers all locales before tests run                                                              |

## Adding a New Locale

When you add a new locale (e.g., `nl-NL`), follow these steps:

### 1. Create the locale JSON and wrapper

```text
src/i18n/lang/nl-NL.json         # Locale data (currency, date, masks, validate patterns)
src/i18n/locales/nl-NL.js        # Wrapper that calls registerLocale('nl-NL', data)
```

### 2. Update Rollup config

Add `'nl-NL'` to the locale wrappers array in `rollup.config.cjs`:

```js
...[
  'pt-BR',
  // ... other locales
  'nl-NL', // <-- add here
].map((locale) => ({ ... }))
```

### 3. Register the locale in test setup

Edit `test/setup.js` and import the new wrapper:

```js
import '../src/i18n/locales/nl-NL.js';
```

### 4. Add test cases

Edit `test/locales.cases.js` and add a new block with **at least 3 valid and 3 invalid examples** for each validator:

```js
{
  locale: 'nl-NL',
  alpha: {
    valid: ['Amsterdam', 'Rotterdam', 'Utrecht', 'Eindhoven'],
    invalid: ['Amsterdam1', 'Rotterdam@', '123', 'Utrecht!']
  },
  alphanumeric: {
    valid: ['A1B2C3', 'Test123', 'NL2024', 'ABC789'],
    invalid: ['A1B 2C3', 'Test@123', 'NL-2024', 'ABC_789']
  },
  postalcode: {
    valid: ['1012 AB', '1012AB', '2514JG', '3011AD'],
    invalid: ['1012-AB', 'AB1012', '12345', 'ABCDEF']
  },
  mobile: {
    valid: ['+31612345678', '0612345678', '+31 6 12345678', '06-12345678'],
    invalid: ['012345678', '1234567890', '+44 20 7946 0958', '06123']
  },
  boolean: {
    valid: ['waar', 'onwaar', 'ja', 'nee', '1', '0'],
    invalid: ['true', 'false', 'yes', 'no', 'sim', 'oui']
  },
  // taxid: optional, if locale-specific validateTaxId exists
}
```

The generic test runner (`locales.spec.test.js`) will automatically pick up these cases and generate tests for:

- `alpha` (synchronous validator)
- `alphanumeric` (synchronous validator)
- `postalcode` (synchronous validator)
- `mobile` (asynchronous validator, awaited)
- `taxid` (asynchronous validator, awaited, optional)
- `boolean` (synchronous validator)

**Important**: Each validator must have at least 3 valid and 3 invalid examples to ensure comprehensive coverage.

### 5. Run tests

```bash
npm test
```

The generic runner validates:

- **Valid cases**: must return `{ valid: true }`
- **Invalid cases**: must return `{ valid: false, error: <string> }` (asserts only `valid: false` with `toMatchObject`)

### 6. (Optional) Add dedicated validator tests

If the locale introduces a new `validateTaxId` or specialized behavior, add dedicated tests in:

- `test/validators/validateTaxId.test.js` (for taxid)
- Or create new test files as needed

## Test Cases Reference

### Locale-Specific Validators

Each locale block in `locales.cases.js` supports:

| Field          | Type                                     | Description                                  | Required Examples |
| -------------- | ---------------------------------------- | -------------------------------------------- | ----------------- |
| `locale`       | `string` (required)                      | Locale code (e.g., `'en-CA'`, `'fr-FR'`)     | N/A               |
| `alpha`        | `{ valid: string[], invalid: string[] }` | Alpha-only validation examples               | 3+ each           |
| `alphanumeric` | `{ valid: string[], invalid: string[] }` | Alphanumeric validation examples             | 3+ each           |
| `postalcode`   | `{ valid: string[], invalid: string[] }` | Postal code validation examples              | 3+ each           |
| `mobile`       | `{ valid: string[], invalid: string[] }` | Mobile number validation examples (async)    | 3+ each           |
| `taxid`        | `{ valid: string[], invalid: string[] }` | Tax ID validation examples (async, optional) | 3+ each           |
| `boolean`      | `{ valid: string[], invalid: string[] }` | Boolean validation examples                  | 3+ each           |

Omit any field that doesn't make sense for a locale (e.g., if no mobile pattern is defined, skip `mobile`).

### Global Validators

Each validator in `globals.cases.js` must have at least 3 valid and 3 invalid examples:

| Validator           | Description                           | Example Valid                            | Example Invalid         |
| ------------------- | ------------------------------------- | ---------------------------------------- | ----------------------- |
| `isHexadecimal`     | Hexadecimal string                    | `'deadBEEF'`, `'ff0044'`                 | `'abcdefg'`, `'0x1234'` |
| `isBIC`             | Bank Identifier Code                  | `'DEUTDEFF'`, `'NEDSZAJJ'`               | `'DEUT'`, `'DE12DEFF'`  |
| `isUUID`            | UUID v1-v5                            | `'A987FBC9-4BED-3078-CF07-9141BA07C9F3'` | `'xxxA987FBC9...'`      |
| `isISINCode`        | International Securities ID           | `'US0378331005'`                         | `'US0378331004'`        |
| `isISSN`            | International Standard Serial Number  | `'0378-5955'`                            | `'0378-5954'`           |
| `isISRC`            | International Standard Recording Code | `'USRC17607839'`                         | `'USRC1760783'`         |
| `isISBN10`          | ISBN-10                               | `'0306406152'`                           | `'0306406151'`          |
| `isISBN13`          | ISBN-13                               | `'9780306406157'`                        | `'9780306406150'`       |
| `isHexColor`        | Hex color code                        | `'#ff0000'`, `'f00'`                     | `'#ff00gg'`, `'red'`    |
| `isIMEI`            | IMEI number                           | `'352099001761481'`                      | `'352099001761480'`     |
| `ISO3166-1-alpha-2` | Country code (2-letter)               | `'US'`, `'BR'`                           | `'USA'`, `'us'`         |
| `ISO3166-1-alpha-3` | Country code (3-letter)               | `'USA'`, `'BRA'`                         | `'US'`, `'usa'`         |
| `ISO639_1`          | Language code                         | `'en'`, `'pt'`                           | `'EN'`, `'eng'`         |
| `ISO4217`           | Currency code                         | `'USD'`, `'BRL'`                         | `'DOLLAR'`, `'usd'`     |
| `isMongoId`         | MongoDB ObjectId                      | `'507f1f77bcf86cd799439011'`             | `'xyz123'`              |
| `isDataURI`         | Data URI                              | `'data:text/plain;base64,...'`           | `'http://...'`          |
| `isHSL`             | HSL color                             | `'hsl(360, 100%, 50%)'`                  | `'hsl(361, 100%, 50%)'` |
| `isMimeType`        | MIME type                             | `'text/plain'`, `'image/png'`            | `'text'`, `'text/'`     |
| `isMultibyte`       | Multibyte characters                  | `'こんにちは'`, `'你好'`                 | `'hello'`, `'123'`      |
| `isAscii`           | ASCII characters only                 | `'hello'`, `'123'`                       | `'café'`, `'Привет'`    |
| `isSemVer`          | Semantic version                      | `'1.0.0'`, `'1.0.0-alpha'`               | `'1'`, `'v1.2.3'`       |
| `isSurrogatePair`   | Surrogate pair character              | `'😀'`, `'🎉'`                           | `'a'`, `'abc'`          |
| `isMACAddress`      | MAC address                           | `'00:1B:44:11:3A:B7'`                    | `'ZZ:1B:44:11:3A:B7'`   |

## Adding Global Validators

If adding a new global validator (one that doesn't depend on locale):

1. **Add test cases to `test/globals.cases.js`**:

   ```js
   isNewValidator: {
     valid: ['example1', 'example2', 'example3', 'example4'],
     invalid: ['bad1', 'bad2', 'bad3', 'bad4'],
   },
   ```

2. **Add test block to `test/globals.spec.test.js`**:

   ```js
   import { validateNewValidator } from '../src/validators/validateNewValidator/index.js';

   // Inside describe('Global Validators')
   describe('isNewValidator', () => {
     it('valid new validator', () => {
       for (const v of checkArray(GLOBAL_CASES.isNewValidator.valid)) {
         expect(validateNewValidator(v)).toEqual({ valid: true });
       }
     });
     it('invalid new validator', () => {
       for (const v of checkArray(GLOBAL_CASES.isNewValidator.invalid)) {
         expect(validateNewValidator(v)).toMatchObject({ valid: false });
       }
     });
   });
   ```

3. **Ensure at least 3 valid and 3 invalid examples** for comprehensive coverage.

## Key Principles

- **Comprehensive Coverage**: Use at least 3 valid and 3 invalid examples for each validator to ensure edge cases are covered.
- **Consistency**: Use `toEqual({ valid: true })` for positive cases, `toMatchObject({ valid: false })` for negative cases (to tolerate the error field).
- **Async validators**: Always `await` validators like `validateMobileNumber`, `validateTaxId`, and `validateISO`.
- **Minimal duplication**: The generic runners handle all tests automatically. Add dedicated tests only for complex logic (e.g., checksum algorithms, special rules).
- **Opt-in i18n**: Every locale must be explicitly imported in `test/setup.js` to be registered before tests run.

## Example Workflow

Adding `tr-TR` (Turkey):

1. Create `src/i18n/lang/tr-TR.json` with Turkish locale data.
2. Create `src/i18n/locales/tr-TR.js` that registers `'tr-TR'`.
3. Update `rollup.config.cjs` to include `'tr-TR'`.
4. Add `import '../src/i18n/locales/tr-TR.js';` to `test/setup.js`.
5. Add a block to `test/locales.cases.js`:

   ```js
   {
     locale: 'tr-TR',
     alpha: { valid: ['İstanbul'], invalid: ['İstanbul1'] },
     alphanumeric: { valid: ['A1B2C3'], invalid: ['A1B 2C3'] },
     postalcode: { valid: ['34000'], invalid: ['3400'] },
   }
   ```

6. Run `npm test` — the runner creates 6 tests automatically (3 for valid, 3 for invalid).

## Tips

- If a locale uses accents or special chars in alpha/alphanumeric, ensure the regex in the locale JSON includes those chars (e.g., `ÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ` for French).
- For postal codes, test both formatted and unformatted versions if the validator normalizes.
- For mobile, include international (`+X ...`) and local formats if both are supported.
- For taxid, if implementing a new checksum algorithm (like Luhn, mod11, etc.), reuse existing utils from `src/utils/algorithms/` when possible.

## Running Specific Tests

```bash
# Run all tests
npm test

# Run only locale tests
npm test locales.spec

# Run only global validator tests
npm test globals.spec

# Run specific validator tests
npm test validateTaxId

# Watch mode
npm test -- --watch
```

## Test Coverage Summary

The test suite now includes:

- **13 locales** with comprehensive test coverage:
  - `en-CA`, `fr-CA` (Canada)
  - `en-IN` (India)
  - `en-AU` (Australia)
  - `pt-BR` (Brazil)
  - `es-AR` (Argentina)
  - `de-DE` (Germany)
  - `en-UK` (United Kingdom)
  - `es-ES` (Spain)
  - `es-MX` (Mexico)
  - `it-IT` (Italy)
  - `pt-PT` (Portugal)
  - `fr-FR` (France)

- **23 global validators**:
  - String format validators (hexadecimal, BIC, UUID, ISIN, ISSN, ISRC, ISBN, IMEI, MongoId, MAC address)
  - Color validators (hex color, HSL)
  - ISO standard validators (3166-1 alpha-2/3, 639-1, 4217)
  - Content validators (data URI, MIME type, multibyte, ASCII, surrogate pair)
  - Version validator (SemVer)

- **Each validator has at least 3 valid and 3 invalid test cases** to ensure comprehensive coverage of edge cases.

---

For more details on the opt-in i18n system and locale registration, see the main README.
