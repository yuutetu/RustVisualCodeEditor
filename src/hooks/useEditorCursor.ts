import { useCallback, useLayoutEffect, useRef } from 'react';

export function useEditorCursor(
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  onCursorChange: (pos: number) => void,
) {
  const pendingCursorRef = useRef<number | null>(null);
  // onCursorChange が setCursorPos を呼び出し App が再レンダリングされると、
  // iOS Safari がカーソル位置をリセットすることがある。
  // protectCursorRef に位置を残し、その次のレンダリングでも再設定することで対処する。
  const protectCursorRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    if (pendingCursorRef.current !== null) {
      const pos = pendingCursorRef.current;
      pendingCursorRef.current = null;
      protectCursorRef.current = pos;
      el.selectionStart = pos;
      el.selectionEnd = pos;
      onCursorChange(pos);
    } else if (protectCursorRef.current !== null) {
      const pos = protectCursorRef.current;
      protectCursorRef.current = null;
      el.selectionStart = pos;
      el.selectionEnd = pos;
    }
  });

  const setPendingCursor = useCallback((pos: number) => {
    pendingCursorRef.current = pos;
  }, []);

  const handleSelect = useCallback(
    (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
      onCursorChange((e.target as HTMLTextAreaElement).selectionStart);
    },
    [onCursorChange],
  );

  return { setPendingCursor, handleSelect };
}
