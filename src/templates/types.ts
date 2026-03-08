export type InsertionMode =
  | { type: 'cursor' }
  | { type: 'anchor'; anchor: 'helpers' | 'input' };

export type PlaceholderKind = 'identifier' | 'number';

export interface Placeholder {
  name: string;
  kind: PlaceholderKind;
  defaultValue: string;
}

export interface Template {
  id: string;
  label: string;
  category: string;
  insertion: InsertionMode;
  body: string;
  placeholders: Placeholder[];
}
