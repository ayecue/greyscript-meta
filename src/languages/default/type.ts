export interface DescriptionEntry {
  description: string;
  example?: string[];
}

export interface DescriptionContainer {
  $meta?: DescriptionEntry,
  [key: string]: DescriptionEntry
}

export interface Descriptions {
  [key: string]: DescriptionContainer
}