# TypeScript Support

FormaJS agora possui suporte completo a TypeScript através de definições de tipo geradas automaticamente.

## Como Funciona

O projeto utiliza **JSDoc** para documentar os tipos no código JavaScript, e o TypeScript compila essas anotações em arquivos `.d.ts` (declarações de tipo).

### Vantagens desta Abordagem

1. **Código permanece em JavaScript**: Não há necessidade de migrar todo o código para `.ts`
2. **Tipos automáticos**: TypeScript gera os tipos a partir dos comentários JSDoc
3. **Autocomplete**: IDEs como VS Code fornecem autocomplete e validação de tipos
4. **Compatibilidade**: Usuários JavaScript não são afetados, usuários TypeScript têm tipos completos

## Estrutura de Arquivos

```text
src/               # Código-fonte JavaScript com JSDoc
dist/types/        # Arquivos .d.ts gerados automaticamente
tsconfig.json      # Configuração do TypeScript
```

## Scripts

```bash
# Gerar arquivos de tipo (.d.ts)
npm run build:types

# Build completo (tipos + bundle)
npm run build
```

## Exemplo de Uso (TypeScript)

```typescript
import { validateTaxId } from '@formajs/formajs';

// TypeScript reconhece automaticamente os tipos
const result = validateTaxId('7736674153', { locale: 'ru-RU' });

// result é tipado como ValidationResult
if (result.valid) {
  console.log('Tax ID válido!');
} else {
  console.log('Erro:', result.error);
}
```

## Adicionando Tipos a Novas Funções

Ao criar novas funções, adicione JSDoc com tipos:

```javascript
/**
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Se a validação passou
 * @property {string} [error] - Código de erro (opcional)
 * @property {Object} [context] - Contexto adicional (opcional)
 */

/**
 * Valida um valor específico
 * @param {string} value - O valor a validar
 * @param {Object} [options] - Opções de validação
 * @returns {ValidationResult} Resultado da validação
 */
export function myValidator(value, options = {}) {
  // implementação
}
## Reutilizando typedefs nos módulos

Para evitar duplicação de tipos, use os typedefs comuns:

```javascript
// Em um validator
import '../types/index.js';

/**
 * @param {string|Date} value
 * @param {import('./types/index.js').DateRangeOptions} [options]
 * @returns {import('./types/index.js').ValidationResult}
 */
export function validateDate(value, options = {}) { /* ... */ }
```

Em formatters:

```javascript
/**
 * @param {string} str
 * @param {import('./types/index.js').FormatterOptions} [options]
 * @returns {string}
 */
export function formatMobileNumber(str, options = {}) { /* ... */ }
```

E para máscaras específicas de locale:

```javascript
/** @type {import('./types/index.js').LocaleMasks} */
const masks = localeData.masks;
```

## Generics com @template

Você pode definir tipos genéricos em JSDoc com `@template`:

```javascript
/**
 * @template T
 * @typedef {Object} Result
 * @property {boolean} ok
 * @property {T} [value]
 * @property {string} [error]
 */
```

Em funções:

```javascript
/**
 * @template T
 * @param {T} value
 * @returns {import('./types/index.js').Result<T>}
 */
export function wrap(value) { return { ok: true, value }; }
```
```

## Configuração

O arquivo `tsconfig.json` está configurado para:

- Aceitar JavaScript com JSDoc (`allowJs: true`)
- Gerar apenas declarações de tipo (`emitDeclarationOnly: true`)
- Incluir source maps para debugging (`declarationMap: true`)
- Resolver imports JSON (`resolveJsonModule: true`)

## Publicação

Os arquivos `.d.ts` são automaticamente incluídos no pacote npm através do campo `files` no `package.json`.

Os usuários TypeScript automaticamente terão acesso aos tipos ao instalar o pacote.
