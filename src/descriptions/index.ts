import { Descriptions } from './default/type';
import en from './en';

export const getLanguageFile = (language: string = 'en'): Descriptions => {
  switch (language) {
    case 'en':
      return en;
    default:
      throw new Error(`Language "${language}" is unknown.`);
  }
};

export const getMetaDescription = (type: string, language?: string): string => {
  const lang = getLanguageFile(language);
  return lang?.[type]?.$meta?.description;
};

export const getMetaExample = (type: string, language?: string): string[] => {
  const lang = getLanguageFile(language);
  return lang?.[type]?.$meta?.example;
};

export const getDescription = (
  type: string,
  method: string,
  language?: string
): string => {
  const lang = getLanguageFile(language);
  return lang?.[type]?.[method]?.description;
};

export const getExample = (
  type: string,
  method: string,
  language?: string
): string[] => {
  const lang = getLanguageFile(language);
  return lang?.[type]?.[method]?.example;
};
