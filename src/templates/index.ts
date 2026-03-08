import type { Template } from './types';

export const TEMPLATES: Template[] = [
  {
    id: 'main_scaffold',
    label: 'Main',
    category: 'scaffold',
    insertion: { type: 'cursor' },
    body: `use proconio::input;

fn main() {
    // <input>

    // <helpers>
}`,
    placeholders: [],
  },
  {
    id: 'read_line_ints',
    label: 'Read ints',
    category: 'io',
    insertion: { type: 'anchor', anchor: 'input' },
    body: `    input! {
        {{vars}}: [i64; {{n}}],
    }`,
    placeholders: [
      { name: 'vars', kind: 'identifier', defaultValue: 'vals' },
      { name: 'n', kind: 'identifier', defaultValue: 'n' },
    ],
  },
  {
    id: 'read_n_lines',
    label: 'Read N lines',
    category: 'io',
    insertion: { type: 'anchor', anchor: 'input' },
    body: `    input! {
        {{n}}: usize,
        {{rows}}: [[i64]; {{n}}],
    }`,
    placeholders: [
      { name: 'n', kind: 'identifier', defaultValue: 'n' },
      { name: 'rows', kind: 'identifier', defaultValue: 'rows' },
    ],
  },
  {
    id: 'vec_new',
    label: 'Vec new',
    category: 'collections',
    insertion: { type: 'cursor' },
    body: `    let mut {{vec_name}}: Vec<{{elem_type}}> = Vec::with_capacity({{n}});`,
    placeholders: [
      { name: 'vec_name', kind: 'identifier', defaultValue: 'v' },
      { name: 'elem_type', kind: 'identifier', defaultValue: 'i64' },
      { name: 'n', kind: 'identifier', defaultValue: 'n' },
    ],
  },
  {
    id: 'sort_asc',
    label: 'Sort ↑',
    category: 'algorithm',
    insertion: { type: 'cursor' },
    body: `    {{vec_name}}.sort();`,
    placeholders: [
      { name: 'vec_name', kind: 'identifier', defaultValue: 'v' },
    ],
  },
  {
    id: 'sort_desc',
    label: 'Sort ↓',
    category: 'algorithm',
    insertion: { type: 'cursor' },
    body: `    {{vec_name}}.sort_by(|a, b| b.cmp(a));`,
    placeholders: [
      { name: 'vec_name', kind: 'identifier', defaultValue: 'v' },
    ],
  },
  {
    id: 'hashmap_new',
    label: 'HashMap',
    category: 'collections',
    insertion: { type: 'cursor' },
    body: `    let mut {{map_name}}: std::collections::HashMap<{{key_type}}, {{val_type}}> = std::collections::HashMap::new();`,
    placeholders: [
      { name: 'map_name', kind: 'identifier', defaultValue: 'map' },
      { name: 'key_type', kind: 'identifier', defaultValue: 'i64' },
      { name: 'val_type', kind: 'identifier', defaultValue: 'i64' },
    ],
  },
  {
    id: 'btreemap_new',
    label: 'BTreeMap',
    category: 'collections',
    insertion: { type: 'cursor' },
    body: `    let mut {{map_name}}: std::collections::BTreeMap<{{key_type}}, {{val_type}}> = std::collections::BTreeMap::new();`,
    placeholders: [
      { name: 'map_name', kind: 'identifier', defaultValue: 'map' },
      { name: 'key_type', kind: 'identifier', defaultValue: 'i64' },
      { name: 'val_type', kind: 'identifier', defaultValue: 'i64' },
    ],
  },
  {
    id: 'println_val',
    label: 'println!',
    category: 'io',
    insertion: { type: 'cursor' },
    body: `    println!("{}", {{val}});`,
    placeholders: [
      { name: 'val', kind: 'identifier', defaultValue: 'ans' },
    ],
  },
  {
    id: 'for_loop',
    label: 'for loop',
    category: 'algorithm',
    insertion: { type: 'cursor' },
    body: `    for {{i}} in 0..{{n}} {
        // todo
    }`,
    placeholders: [
      { name: 'i', kind: 'identifier', defaultValue: 'i' },
      { name: 'n', kind: 'identifier', defaultValue: 'n' },
    ],
  },
];
