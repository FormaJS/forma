/**
 * Tipos comuns reutilizáveis expostos via JSDoc
 * Esses typedefs são usados em validators, formatters e parsers.
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Se a validação passou
 * @property {string} [error] - Código de erro (opcional)
 * @property {Object} [context] - Contexto adicional (opcional)
 */

/**
 * @typedef {Object} FormatterOptions
 * @property {string} [locale] - Locale BCP-47 (ex.: 'pt-BR')
 * @property {string} [format] - Formato da máscara (ex.: 'local'|'international')
 * @property {string} [type] - Tipo específico (ex.: 'INN', 'OGRN')
 */

/**
 * @typedef {Object} MaskObject
 * @property {string} [local]
 * @property {string} [international]
 * @property {string} [default]
 */

/**
 * @typedef {Object} DateRangeOptions
 * @property {Date|string} [minDate] - Data mínima (Date ou ISO-string)
 * @property {Date|string} [maxDate] - Data máxima (Date ou ISO-string)
 * @property {string} [locale] - Locale para parsing/validação
 */

/**
 * @typedef {Object} LocaleMasks
 * @property {MaskObject} [mobileNumber]
 * @property {MaskObject} [postalcode]
 * @property {Record<string,string>} [taxId]
 */

/**
 * @template T
 * @typedef {Object} Result
 * @property {boolean} ok
 * @property {T} [value]
 * @property {string} [error]
 */

export {}; // apenas para garantir módulo ESM
