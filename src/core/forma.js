import { getLocaleData } from '../i18n/index.js';
import * as formatters from '../formatters/index.js';
import * as parsers from '../parsers/index.js';
import * as sanitizers from '../sanitizers/index.js';
import * as validators from '../validators/index.js';

/**
 * Formats a template string (e.g. "Value is {min}") with data.
 * @param {string} template - The message template (e.g. "Value is {min}")
 * @param {object} context - The data object (e.g. { min: 5 })
 * @returns {string} The formatted string
 */
function formatMessage(template, context = {}) {
  if (!template) return 'Erro de validação desconhecido.';

  return template.replace(/{(\w+)}/g, (match, key) => {
    return Object.prototype.hasOwnProperty.call(context, key) ? context[key] : match;
  });
}

/**
 * The main Engine.
 */
export class Forma {
  constructor(locale = 'en-US') {
    this.locale = locale;
    this.config = getLocaleData(locale);

    if (!this.config) {
      throw new Error(`Forma.js: Locale "${locale}" not found.`);
    }

    this._bindMethods();
  }

  setLocale(locale) {
    const newConfig = getLocaleData(locale);
    if (!newConfig) {
      throw new Error(`Forma.js: Locale "${locale}" not found.`);
    }
    this.locale = locale;
    this.config = newConfig;
  }

  /**
   * Private method to bind/wrap all rules, parsers and sanitizers
   * so they work with the class engine.
   */
  _bindMethods() {
    for (const ruleName in validators) {
      this[ruleName] = (value, ...args) => {
        const ruleFn = validators[ruleName];

        let options = {};
        let finalArgs = [...args];

        if (args.length > 0) {
          const lastArg = args[args.length - 1];
          if (typeof lastArg === 'object' && lastArg !== null && !Array.isArray(lastArg)) {
            options = lastArg;
            finalArgs.pop();
          }
        }

        // options passed to the rule should override the instance locale
        const ruleOptions = { locale: this.locale, ...options };

        const result = ruleFn(value, ...finalArgs, ruleOptions);

        // If the rule returned a Promise (async function), return a Promise
        if (result && typeof result.then === 'function') {
          return result.then((resolved) => {
            if (resolved && resolved.valid) {
              return { valid: true, message: null, context: resolved?.context };
            }
            // Use the locale from ruleOptions (call-level) when formatting messages
            const cfg = getLocaleData(ruleOptions.locale) || this.config;
            const messageTemplate = cfg.messages
              ? cfg.messages[resolved?.error]
              : cfg[resolved?.error];
            const message = formatMessage(messageTemplate, resolved?.context);
            return {
              valid: false,
              message: message,
              error: resolved?.error,
              context: resolved?.context,
            };
          });
        }

        if (result && result.valid) {
          return { valid: true, message: null, context: result?.context };
        }

        const cfg = getLocaleData(ruleOptions.locale) || this.config;
        const messageTemplate = cfg.messages ? cfg.messages[result?.error] : cfg[result?.error];
        const message = formatMessage(messageTemplate, result?.context);

        return {
          valid: false,
          message: message,
          error: result?.error,
          context: result?.context,
        };
      };
    }

    for (const ruleName in parsers) {
      this[ruleName] = (value, ...args) => {
        const ruleFn = parsers[ruleName];

        let options = {};
        let finalArgs = [...args];

        if (args.length > 0) {
          const lastArg = args[args.length - 1];
          if (typeof lastArg === 'object' && lastArg !== null && !Array.isArray(lastArg)) {
            options = lastArg;
            finalArgs.pop();
          }
        }

        const ruleOptions = { ...options, locale: this.locale };

        return ruleFn(value, ...finalArgs, ruleOptions);
      };
    }

    for (const ruleName in sanitizers) {
      this[ruleName] = (value, ...args) => {
        const ruleFn = sanitizers[ruleName];

        let options = {};
        let finalArgs = [...args];

        if (args.length > 0) {
          const lastArg = args[args.length - 1];
          if (typeof lastArg === 'object' && lastArg !== null && !Array.isArray(lastArg)) {
            options = lastArg;
            finalArgs.pop();
          }
        }

        const ruleOptions = { ...options, locale: this.locale };

        return ruleFn(value, ...finalArgs, ruleOptions);
      };
    }

    for (const ruleName in formatters) {
      this[ruleName] = (value, ...args) => {
        const ruleFn = formatters[ruleName];

        let options = {};
        let finalArgs = [...args];

        if (args.length > 0) {
          const lastArg = args[args.length - 1];
          if (typeof lastArg === 'object' && lastArg !== null && !Array.isArray(lastArg)) {
            options = lastArg;
            finalArgs.pop();
          }
        }

        const ruleOptions = { ...options, locale: this.locale };

        return ruleFn(value, ...finalArgs, ruleOptions);
      };
    }
  }
}
