import { describe, it, expect } from 'vitest';
import { insertAtCursor, insertAtAnchor } from './insertion';

describe('insertAtCursor', () => {
  it('inserts at middle of code', () => {
    const code = 'line1\nline3';
    const { newCode } = insertAtCursor(code, 6, 'line2');
    expect(newCode).toBe('line1\nline2\nline3');
  });

  it('inserts at empty code', () => {
    const { newCode } = insertAtCursor('', 0, 'hello');
    expect(newCode).toBe('hello');
  });

  it('inserts at end of code', () => {
    const { newCode } = insertAtCursor('abc', 3, 'def');
    expect(newCode).toBe('abc\ndef');
  });
});

describe('insertAtAnchor', () => {
  const code = `fn main() {\n    // <input>\n\n    // <helpers>\n}`;

  it('inserts after input anchor', () => {
    const { newCode } = insertAtAnchor(code, 'input', '    let x = 1;');
    expect(newCode).toContain('// <input>\n    let x = 1;');
  });

  it('inserts after helpers anchor', () => {
    const { newCode } = insertAtAnchor(code, 'helpers', '    fn helper() {}');
    expect(newCode).toContain('// <helpers>\n    fn helper() {}');
  });

  it('falls back to end when anchor not found', () => {
    const { newCode } = insertAtAnchor('no anchors here', 'input', 'snippet');
    expect(newCode).toContain('snippet');
  });
});
