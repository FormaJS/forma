# Contributing to FormaJS

Thanks for your interest in contributing! This guide explains how to set up your environment, propose changes, and submit high‑quality pull requests.

If you encounter anything unclear or missing here, feel free to open an issue to improve this document.

## Code of Conduct

Please be respectful and inclusive. By participating in this project you agree to uphold a professional, welcoming environment for everyone. If an incident occurs, please open an issue or contact the maintainers.

## Ways to contribute

- Report bugs and issues
- Improve documentation and examples
- Suggest or implement new validators/sanitizers/parsers
- Improve locale (i18n) messages
- Improve tests, build, and developer tooling

## Before you start

- Search existing [issues](https://github.com/formajs/forma/issues) to avoid duplicates
- For large changes, open a discussion/issue first to align on scope and API design

## Development setup

- Recommended: Node.js 18+ and npm 9+ (LTS works best)
- Clone and install dependencies:

```bash
git clone https://github.com/formajs/forma.git
cd forma
npm install
```

- Run checks locally (format + lint):

```bash
npm run check
```

- Run tests:

```bash
npm test
# coverage
npm run test:coverage
```

- Build the library:

```bash
npm run build
```

- Generate docs tables:

```bash
npm run docs
```

> Coverage reports are written to `coverage/`; open `coverage/lcov-report/index.html` in your browser.

## Project structure (high level)

- `src/` — library source code
  - `core/` — engine (`Forma` class)
  - `validators/` — validation rules
  - `sanitizers/` — string sanitizers
  - `parsers/` — value parsers, e.g. `toInt`, `toFloat`, `toDate`
  - `i18n/` — locale data and messages
  - `index.js` — public exports (plus deep exports configured in `package.json`)
- `docs/` — local documentation, reads generated tables
- `scripts/` — helpers (e.g., docs generator)
- `dist/` — build outputs (ESM/CJS/UMD)
- `test/` — unit tests (Vitest)

## Coding guidelines

- Write clear, maintainable, and modular code
- Keep functions pure whenever practical; avoid side effects
- Use English JSDoc and inline comments
- Keep the public API stable and documented
- Avoid external dependencies (library is zero‑deps by design)
- Follow existing patterns for validators/sanitizers/parsers
- Prefer small, focused modules and unit tests per module

### Input/Output contracts

- Standalone validator functions return:

  ```js
  { valid: boolean, error?: string, context?: object }
  ```

- Calls via the `Forma` instance return a localized message when invalid:

  ```js
  { valid: true, message: null } // success
  { valid: false, message: string, error?: string, context?: object } // failure
  ```

- Options are passed as the last argument and merged with the instance locale when used via `Forma`.
- Async validators are supported; instance methods will propagate Promises.

## Adding a validator

1. Create a new folder under `src/validators/validateFoo/` and export `validateFoo` from `index.js`
2. Add English JSDoc and inline comments; include a concise description, parameters, and return shape
3. Add tests under `test/validators/validateFoo/`
4. Export the rule from `src/validators/index.js`
5. Add i18n messages (error codes) for all supported locales in `src/i18n/`
6. If applicable, update the docs generator to list the new rule (used by `npm run docs`)

### Validator checklist

- [ ] Input type checks and conversion via utils (e.g., `isString`, `toString`)
- [ ] Well‑named error codes (e.g., `validateFoo`, `validateFooOptionX`)
- [ ] Helpful `context` in errors for message interpolation
- [ ] Options object documented and validated (with sensible defaults)
- [ ] Tests for happy path, edge cases, and invalid inputs

## Adding a sanitizer or parser

- Follow similar steps under `src/sanitizers/` or `src/parsers/`
- Document input/output semantics and edge cases
- Keep functions deterministic and side‑effect free

## Internationalization (i18n)

- Default locale: `en-US`
- Messages are looked up by error code; keep codes stable to avoid breaking translations
- Add new messages for each locale in `src/i18n/`
- When formatting messages, provide a useful `context` object for placeholders

## Documentation

- Regenerate with `npm run docs` after adding/modifying rules
- Open `/docs` locally to verify if everthing looks fine

## Commit style

- Prefer [Conventional Commits](https://www.conventionalcommits.org/) (optional but encouraged): - `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- Write commit messages in the imperative, present tense
- Keep PRs focused and reasonably small

## Pull request checklist

- [ ] Discussed the change in an issue (for larger features)
- [ ] Added/updated tests for new or changed behavior
- [ ] Ran `npm run check` and fixed lint/style issues
- [ ] Tests pass locally (`npm test`) and coverage is acceptable
- [ ] Built the project (`npm run build`) when it affects build output
- [ ] Updated documentation (`README.md`, or generated docs) as needed
- [ ] Linked related issues and provided a clear rationale in the PR description

## Releases

- Maintainers handle releases; `prepublishOnly` runs the build
- Keep `dist/` artifacts limited to published packages; source of truth is `src/`

## License

By contributing to this repository, you agree that your contributions will be licensed under the MIT License.
