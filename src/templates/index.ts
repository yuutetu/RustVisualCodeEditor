import type { Template } from './types';

export const TEMPLATES: Template[] = [
  {
    id: 'main_scaffold',
    label: 'Main',
    category: 'scaffold',
    insertion: { type: 'cursor' },
    body: `use std::io::{self, BufRead, Write, BufWriter};

fn main() {
    let stdin = io::stdin();
    let stdout = io::stdout();
    let mut out = BufWriter::new(stdout.lock());

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
    body: `    let mut line = String::new();
    stdin.lock().read_line(&mut line).unwrap();
    let {{vars}}: Vec<i64> = line.split_whitespace()
        .map(|x| x.parse().unwrap())
        .collect();`,
    placeholders: [
      { name: 'vars', kind: 'identifier', defaultValue: 'vals' },
    ],
  },
  {
    id: 'read_n_lines',
    label: 'Read N lines',
    category: 'io',
    insertion: { type: 'anchor', anchor: 'input' },
    body: `    let {{n}}: usize = {
        let mut s = String::new();
        stdin.lock().read_line(&mut s).unwrap();
        s.trim().parse().unwrap()
    };
    let {{rows}}: Vec<Vec<i64>> = (0..{{n}}).map(|_| {
        let mut s = String::new();
        stdin.lock().read_line(&mut s).unwrap();
        s.split_whitespace().map(|x| x.parse().unwrap()).collect()
    }).collect();`,
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
    label: 'writeln!',
    category: 'io',
    insertion: { type: 'cursor' },
    body: `    writeln!(out, "{}", {{val}}).unwrap();`,
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
