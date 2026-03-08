import { describe, it, expect } from 'vitest';
import { findPlaceholders, replacePlaceholder } from './placeholder';

describe('findPlaceholders', () => {
  it('finds single placeholder', () => {
    const result = findPlaceholders('let {{n}}: usize = 0;');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('n');
  });

  it('finds multiple placeholders', () => {
    const result = findPlaceholders('{{a}} + {{b}} = {{c}}');
    expect(result.map(p => p.name)).toEqual(['a', 'b', 'c']);
  });

  it('returns empty for no placeholders', () => {
    expect(findPlaceholders('no placeholders here')).toHaveLength(0);
  });
});

describe('replacePlaceholder', () => {
  it('replaces all occurrences', () => {
    const result = replacePlaceholder('{{n}} items, size {{n}}', 'n', '42');
    expect(result).toBe('42 items, size 42');
  });

  it('does not replace other placeholders', () => {
    const result = replacePlaceholder('{{a}} and {{b}}', 'a', 'X');
    expect(result).toBe('X and {{b}}');
  });
});
