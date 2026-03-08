const ANCHOR_MARKERS = {
  helpers: '// <helpers>',
  input: '// <input>',
} as const;

export function insertAtCursor(
  code: string,
  cursorPos: number,
  snippet: string,
): { newCode: string; newCursorPos: number } {
  const before = code.slice(0, cursorPos);
  const after = code.slice(cursorPos);
  const needsNewlineBefore = before.length > 0 && !before.endsWith('\n');
  const needsNewlineAfter = after.length > 0 && !after.startsWith('\n');
  const inserted =
    (needsNewlineBefore ? '\n' : '') +
    snippet +
    (needsNewlineAfter ? '\n' : '');
  const newCode = before + inserted + after;
  const newCursorPos = before.length + inserted.length;
  return { newCode, newCursorPos };
}

export function insertAtAnchor(
  code: string,
  anchor: 'helpers' | 'input',
  snippet: string,
): { newCode: string; newCursorPos: number } {
  const marker = ANCHOR_MARKERS[anchor];
  const markerIndex = code.indexOf(marker);

  if (markerIndex === -1) {
    return insertAtCursor(code, code.length, snippet);
  }

  const lineEnd = code.indexOf('\n', markerIndex);
  const insertPos = lineEnd === -1 ? code.length : lineEnd + 1;

  const before = code.slice(0, insertPos);
  const after = code.slice(insertPos);
  const newCode = before + snippet + '\n' + after;
  const newCursorPos = insertPos + snippet.length + 1;
  return { newCode, newCursorPos };
}
