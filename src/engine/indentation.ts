const INDENT = '    '; // 4 spaces

/** Returns the leading whitespace of the line containing `pos`. */
function getLineIndent(code: string, pos: number): string {
  const lineStart = code.lastIndexOf('\n', pos - 1) + 1;
  const match = code.slice(lineStart).match(/^(\s*)/);
  return match ? match[1] : '';
}

/**
 * Handle Enter key: insert newline with auto-indentation.
 * - Preserves current line's indentation.
 * - Adds one extra indent level after { ( [
 * - If the next non-space character is } ) ], also places the closing
 *   bracket on its own dedented line (split-bracket style).
 */
export function handleEnterKey(
  code: string,
  selStart: number,
  selEnd: number,
): { newCode: string; newCursorPos: number } {
  const before = code.slice(0, selStart);
  const after = code.slice(selEnd);

  const currentIndent = getLineIndent(code, selStart);
  const trimmedBefore = before.trimEnd();
  const endsWithOpen = /[{(\[]$/.test(trimmedBefore);
  const nextIsClose = /^\s*[})\]]/.test(after);

  if (endsWithOpen && nextIsClose) {
    // Insert blank indented line; closing bracket stays on its own line
    const newCode = before + '\n' + currentIndent + INDENT + '\n' + currentIndent + after;
    const newCursorPos = before.length + 1 + currentIndent.length + INDENT.length;
    return { newCode, newCursorPos };
  }

  const newIndent = currentIndent + (endsWithOpen ? INDENT : '');
  const newCode = before + '\n' + newIndent + after;
  return { newCode, newCursorPos: before.length + 1 + newIndent.length };
}

/**
 * Handle Tab key: insert 4 spaces, or indent all selected lines.
 */
export function handleTabKey(
  code: string,
  selStart: number,
  selEnd: number,
): { newCode: string; newCursorPos: number } {
  if (selStart === selEnd) {
    const newCode = code.slice(0, selStart) + INDENT + code.slice(selEnd);
    return { newCode, newCursorPos: selStart + INDENT.length };
  }

  // Multi-line selection: indent each line
  const lineStart = code.lastIndexOf('\n', selStart - 1) + 1;
  const prefix = code.slice(0, lineStart);
  const fullSelected = code.slice(lineStart, selEnd);
  const after = code.slice(selEnd);

  const indented = fullSelected.split('\n').map(line => INDENT + line).join('\n');
  const newCode = prefix + indented + after;
  return { newCode, newCursorPos: prefix.length + indented.length };
}

/**
 * Handle Shift+Tab key: remove up to 4 leading spaces from the current line,
 * or from all lines in the selection when text is selected.
 */
export function handleShiftTabKey(
  code: string,
  selStart: number,
  selEnd: number,
): { newCode: string; newCursorPos: number } {
  if (selStart === selEnd) {
    const lineStart = code.lastIndexOf('\n', selStart - 1) + 1;
    const lineContent = code.slice(lineStart);
    const spacesMatch = lineContent.match(/^( {1,4}|\t)/);

    if (!spacesMatch) {
      return { newCode: code, newCursorPos: selStart };
    }

    const removed = spacesMatch[1].length;
    const newCode = code.slice(0, lineStart) + code.slice(lineStart + removed);
    const newCursorPos = Math.max(lineStart, selStart - removed);
    return { newCode, newCursorPos };
  }

  // Multi-line selection: unindent each line
  const lineStart = code.lastIndexOf('\n', selStart - 1) + 1;
  const prefix = code.slice(0, lineStart);
  const fullSelected = code.slice(lineStart, selEnd);
  const after = code.slice(selEnd);

  const unindented = fullSelected
    .split('\n')
    .map(line => {
      const match = line.match(/^( {1,4}|\t)/);
      return match ? line.slice(match[1].length) : line;
    })
    .join('\n');

  const newCode = prefix + unindented + after;
  return { newCode, newCursorPos: prefix.length + unindented.length };
}
