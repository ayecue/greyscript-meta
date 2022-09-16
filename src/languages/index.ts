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

const EXAMPLE_REFERENCE_MAPPING: { key: string; refs: Set<string> }[] = [
  {
    key: 'DOC_NUMBER_EXAMPLE_REFERENCE',
    refs: new Set([
      'DOC_GENERAL_ABS_EXAMPLE',
      'DOC_GENERAL_ACOS_EXAMPLE',
      'DOC_GENERAL_ASIN_EXAMPLE',
      'DOC_GENERAL_ATAN_EXAMPLE',
      'DOC_GENERAL_TAN_EXAMPLE',
      'DOC_GENERAL_COS_EXAMPLE',
      'DOC_GENERAL_SIN_EXAMPLE',
      'DOC_GENERAL_FLOOR_EXAMPLE',
      'DOC_GENERAL_RANGE_EXAMPLE',
      'DOC_GENERAL_RND_EXAMPLE',
      'DOC_GENERAL_SIGN_EXAMPLE',
      'DOC_GENERAL_SQRT_EXAMPLE',
      'DOC_GENERAL_STR_EXAMPLE',
      'DOC_GENERAL_CEIL_EXAMPLE'
    ])
  },
  {
    key: 'DOC_LIST_EXAMPLE_REFERENCE',
    refs: new Set([
      'DOC_GENERAL_SLICE_EXAMPLE',
      'DOC_LIST_REMOVE_EXAMPLE',
      'DOC_LIST_PUSH_EXAMPLE',
      'DOC_LIST_POP_EXAMPLE',
      'DOC_LIST_PULL_EXAMPLE',
      'DOC_LIST_SHUFFLE_EXAMPLE',
      'DOC_LIST_REVERSE_EXAMPLE',
      'DOC_LIST_SUM_EXAMPLE',
      'DOC_LIST_HASINDEX_EXAMPLE',
      'DOC_LIST_INDEXOF_EXAMPLE',
      'DOC_LIST_SORT_EXAMPLE',
      'DOC_LIST_JOIN_EXAMPLE',
      'DOC_LIST_INDEXES_EXAMPLE',
      'DOC_LIST_LEN_EXAMPLE',
      'DOC_LIST_VALUES_EXAMPLE'
    ])
  },
  {
    key: 'DOC_MAP_EXAMPLE_REFERENCE',
    refs: new Set([
      'DOC_MAP_REMOVE_EXAMPLE',
      'DOC_MAP_PUSH_EXAMPLE',
      'DOC_MAP_POP_EXAMPLE',
      'DOC_MAP_SHUFFLE_EXAMPLE',
      'DOC_MAP_SUM_EXAMPLE',
      'DOC_MAP_HASINDEX_EXAMPLE',
      'DOC_MAP_INDEXOF_EXAMPLE',
      'DOC_MAP_INDEXES_EXAMPLE',
      'DOC_MAP_LEN_EXAMPLE',
      'DOC_MAP_VALUES_EXAMPLE'
    ])
  },
  {
    key: 'DOC_STRING_EXAMPLE_REFERENCE',
    refs: new Set([
      'DOC_STRING_REMOVE_EXAMPLE',
      'DOC_STRING_HASINDEX_EXAMPLE',
      'DOC_STRING_INDEXOF_EXAMPLE',
      'DOC_STRING_LASTINDEXOF_EXAMPLE',
      'DOC_STRING_SPLIT_EXAMPLE',
      'DOC_STRING_REPLACE_EXAMPLE',
      'DOC_STRING_TRIM_EXAMPLE',
      'DOC_STRING_INDEXES_EXAMPLE',
      'DOC_STRING_CODE_EXAMPLE',
      'DOC_STRING_LEN_EXAMPLE',
      'DOC_STRING_LOWER_EXAMPLE',
      'DOC_STRING_UPPER_EXAMPLE',
      'DOC_STRING_VAL_EXAMPLE',
      'DOC_STRING_VALUES_EXAMPLE',
      'DOC_GENERAL_CODE_EXAMPLE'
    ])
  }
];

export const getExampleReference = (
  type: string,
  method: string,
  language?: string
): string[] => {
  const lang = getLanguageFile(language);
  const exampleKey = getExampleKey(type, method);
  const result = EXAMPLE_REFERENCE_MAPPING.find(({ refs }) => {
    return refs.has(exampleKey);
  });

  return result ? lang[result.key] : [];
};
