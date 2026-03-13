import type { Template } from './types';

export const TEMPLATES: Template[] = [
  // ── Scaffold ──────────────────────────────────────────────
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

  // ── I/O ───────────────────────────────────────────────────
  {
    id: 'read_single',
    label: 'Read 1',
    category: 'io',
    insertion: { type: 'anchor', anchor: 'input' },
    body: `    input! {
        {{var}}: {{type}},
    }`,
    placeholders: [
      { name: 'var', kind: 'identifier', defaultValue: 'n' },
      { name: 'type', kind: 'identifier', defaultValue: 'i64' },
    ],
  },
  {
    id: 'read_two',
    label: 'Read 2',
    category: 'io',
    insertion: { type: 'anchor', anchor: 'input' },
    body: `    input! {
        {{a}}: {{ta}},
        {{b}}: {{tb}},
    }`,
    placeholders: [
      { name: 'a', kind: 'identifier', defaultValue: 'a' },
      { name: 'ta', kind: 'identifier', defaultValue: 'i64' },
      { name: 'b', kind: 'identifier', defaultValue: 'b' },
      { name: 'tb', kind: 'identifier', defaultValue: 'i64' },
    ],
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
    id: 'println_yes_no',
    label: 'Yes/No',
    category: 'io',
    insertion: { type: 'cursor' },
    body: `    println!("{}", if {{cond}} { "Yes" } else { "No" });`,
    placeholders: [
      { name: 'cond', kind: 'identifier', defaultValue: 'ans' },
    ],
  },

  // ── Collections ───────────────────────────────────────────
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
    id: 'vec_sum',
    label: 'Vec sum',
    category: 'collections',
    insertion: { type: 'cursor' },
    body: `    let {{sum}}: i64 = {{vec_name}}.iter().sum();`,
    placeholders: [
      { name: 'sum', kind: 'identifier', defaultValue: 'sum' },
      { name: 'vec_name', kind: 'identifier', defaultValue: 'v' },
    ],
  },

  // ── Algorithm ─────────────────────────────────────────────
  {
    id: 'if_else',
    label: 'if/else',
    category: 'algorithm',
    insertion: { type: 'cursor' },
    body: `    if {{cond}} {
        // todo
    } else {
        // todo
    }`,
    placeholders: [
      { name: 'cond', kind: 'identifier', defaultValue: 'cond' },
    ],
  },
  {
    id: 'while_loop',
    label: 'while',
    category: 'algorithm',
    insertion: { type: 'cursor' },
    body: `    while {{cond}} {
        // todo
    }`,
    placeholders: [
      { name: 'cond', kind: 'identifier', defaultValue: 'cond' },
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
    id: 'min_max',
    label: 'min/max',
    category: 'algorithm',
    insertion: { type: 'cursor' },
    body: `    let {{mn}} = {{a}}.min({{b}});
    let {{mx}} = {{a}}.max({{b}});`,
    placeholders: [
      { name: 'mn', kind: 'identifier', defaultValue: 'mn' },
      { name: 'mx', kind: 'identifier', defaultValue: 'mx' },
      { name: 'a', kind: 'identifier', defaultValue: 'a' },
      { name: 'b', kind: 'identifier', defaultValue: 'b' },
    ],
  },
  {
    id: 'binary_search',
    label: 'BinSearch',
    category: 'algorithm',
    insertion: { type: 'anchor', anchor: 'helpers' },
    body: `    // 二分探索: 条件を満たす最小のmidを返す
    let (mut lo, mut hi) = (0i64, {{upper}});
    while lo < hi {
        let mid = lo + (hi - lo) / 2;
        if {{cond}} {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    let {{ans}} = lo;`,
    placeholders: [
      { name: 'upper', kind: 'identifier', defaultValue: 'n' },
      { name: 'cond', kind: 'identifier', defaultValue: 'check(mid)' },
      { name: 'ans', kind: 'identifier', defaultValue: 'ans' },
    ],
  },
];
