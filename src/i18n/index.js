import ptBR from './lang/pt-BR.json';
import enUS from './lang/en-US.json';

import globalValidations from './lang/global.json';

export const locales = {
  'pt-BR': ptBR,
  'en-US': enUS,
};

export const localeModules = {
  ptBR: ptBR,
  enUS: enUS,
};

export { globalValidations };

export function getLocaleData(locale) {
  return locales[locale];
}
