import en from './en.json';

export interface LanguageFile {
  // DOC_$TYPE_$METHOD: string
  // DOC_$TYPE_$METHOD_EXAMPLE: string[]
  [key: string]: any;
}

export const getLanguageFile = (language: string = 'en'): LanguageFile => {
  switch (language) {
    case 'en':
      return <LanguageFile>(<unknown>en);
    default:
      throw new Error(`Language "${language}" is unknown.`);
  }
};

export const getDescriptionKey = (type: string, method: string) => {
  return `DOC_${type.toLocaleUpperCase()}_${method.toLocaleUpperCase()}`;
};

export const getExampleKey = (type: string, method: string) => {
  return `${getDescriptionKey(type, method)}_EXAMPLE`;
};

export const getDescription = (
  type: string,
  method: string,
  language?: string
): string => {
  const lang = getLanguageFile(language);
  return lang[getDescriptionKey(type, method)];
};

export const getExample = (
  type: string,
  method: string,
  language?: string
): string[] => {
  const lang = getLanguageFile(language);
  return lang[getExampleKey(type, method)];
};
