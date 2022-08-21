import en from './en.json';

export interface LanguageFile {
  [key: string]: string;
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

export const getDescription = (
  type: string,
  method: string,
  language?: string
): string => {
  const lang = getLanguageFile(language);
  return lang[getDescriptionKey(type, method)];
};
