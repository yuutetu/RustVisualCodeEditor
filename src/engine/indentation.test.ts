import { describe, it, expect } from 'vitest';
import { handleEnterKey, handleTabKey, handleShiftTabKey } from './indentation';

describe('handleEnterKey', () => {
  it('preserves indentation on a plain line', () => {
    const code = '    let x = 1';
    const pos = code.length;
    const { newCode, newCursorPos } = handleEnterKey(code, pos, pos);
    expect(newCode).toBe('    let x = 1\n    ');
    expect(newCursorPos).toBe(newCode.length);
  });

  it('adds extra indent after {', () => {
    const code = 'fn main() {';
    const pos = code.length;
    const { newCode, newCursorPos } = handleEnterKey(code, pos, pos);
    expect(newCode).toBe('fn main() {\n    ');
    expect(newCursorPos).toBe(newCode.length);
  });

  it('adds extra indent after ( ', () => {
    const code = 'vec![';
    const pos = code.length;
    const { newCode, newCursorPos } = handleEnterKey(code, pos, pos);
    expect(newCode).toBe('vec![\n    ');
    expect(newCursorPos).toBe(newCode.length);
  });

  it('splits bracket: places cursor on blank line, closing bracket dedented', () => {
    const code = 'fn main() {}';
    // cursor between { and }
    const selStart = 'fn main() {'.length;
    const selEnd = selStart;
    const { newCode, newCursorPos } = handleEnterKey(code, selStart, selEnd);
    expect(newCode).toBe('fn main() {\n    \n}');
    // cursor should be at end of the indented blank line
    expect(newCursorPos).toBe('fn main() {\n    '.length);
  });

  it('keeps no indentation on a top-level line', () => {
    const code = 'let x = 1';
    const pos = code.length;
    const { newCode } = handleEnterKey(code, pos, pos);
    expect(newCode).toBe('let x = 1\n');
  });

  it('deletes selected text before inserting newline', () => {
    const code = 'hello world';
    const { newCode, newCursorPos } = handleEnterKey(code, 5, 11);
    expect(newCode).toBe('hello\n');
    expect(newCursorPos).toBe(6);
  });
});

describe('handleTabKey', () => {
  it('inserts 4 spaces when no selection', () => {
    const code = 'let x = 1';
    const pos = 3;
    const { newCode, newCursorPos } = handleTabKey(code, pos, pos);
    expect(newCode).toBe('let     x = 1');
    expect(newCursorPos).toBe(7);
  });

  it('indents all lines in a multi-line selection', () => {
    const code = 'let x = 1\nlet y = 2';
    const { newCode, newCursorPos } = handleTabKey(code, 0, code.length);
    expect(newCode).toBe('    let x = 1\n    let y = 2');
    expect(newCursorPos).toBe(newCode.length);
  });
});

describe('handleShiftTabKey', () => {
  it('removes 4 leading spaces', () => {
    const code = '    let x = 1';
    const pos = 4;
    const { newCode, newCursorPos } = handleShiftTabKey(code, pos, pos);
    expect(newCode).toBe('let x = 1');
    expect(newCursorPos).toBe(0);
  });

  it('removes fewer than 4 spaces when line has less', () => {
    const code = '  let x = 1';
    const pos = 2;
    const { newCode, newCursorPos } = handleShiftTabKey(code, pos, pos);
    expect(newCode).toBe('let x = 1');
    expect(newCursorPos).toBe(0);
  });

  it('does nothing when no leading spaces', () => {
    const code = 'let x = 1';
    const pos = 3;
    const { newCode, newCursorPos } = handleShiftTabKey(code, pos, pos);
    expect(newCode).toBe(code);
    expect(newCursorPos).toBe(pos);
  });

  it('removes a leading tab', () => {
    const code = '\tlet x = 1';
    const pos = 1;
    const { newCode, newCursorPos } = handleShiftTabKey(code, pos, pos);
    expect(newCode).toBe('let x = 1');
    expect(newCursorPos).toBe(0);
  });

  it('unindents all lines in a multi-line selection', () => {
    const code = '    let x = 1\n    let y = 2';
    const { newCode, newCursorPos } = handleShiftTabKey(code, 0, code.length);
    expect(newCode).toBe('let x = 1\nlet y = 2');
    expect(newCursorPos).toBe(newCode.length);
  });

  it('skips lines with no indentation in a multi-line selection', () => {
    const code = '    let x = 1\nlet y = 2';
    const { newCode, newCursorPos } = handleShiftTabKey(code, 0, code.length);
    expect(newCode).toBe('let x = 1\nlet y = 2');
    expect(newCursorPos).toBe(newCode.length);
  });
});
