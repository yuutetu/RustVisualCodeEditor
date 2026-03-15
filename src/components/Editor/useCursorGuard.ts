import { useCallback, useLayoutEffect, useRef } from 'react';

/**
 * iOS Safari では onCursorChange が setCursorPos を呼び出して App が再レンダリングされると
 * カーソル位置がリセットされることがある。
 * このフックは pendingCursorRef / protectCursorRef の 2 段階ガードで
 * キー処理後のカーソル位置を DOM に強制設定する。
 */
export function useCursorGuard(onCursorChange: (pos: number) => void) {
  const pendingCursorRef = useRef<number | null>(null);
  const protectCursorRef = useRef<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    if (pendingCursorRef.current !== null) {
      const pos = pendingCursorRef.current;
      pendingCursorRef.current = null;
      // onCursorChange が引き起こす再レンダリング後もカーソルを守るために保存しておく
      protectCursorRef.current = pos;
      el.selectionStart = pos;
      el.selectionEnd = pos;
      onCursorChange(pos);
    } else if (protectCursorRef.current !== null) {
      // onCursorChange による再レンダリング後に iOS がカーソルをリセットしていた場合に再設定
      const pos = protectCursorRef.current;
      protectCursorRef.current = null;
      el.selectionStart = pos;
      el.selectionEnd = pos;
    }
  });

  const setPendingCursor = useCallback((pos: number) => {
    pendingCursorRef.current = pos;
  }, []);

  return { setPendingCursor, textareaRef };
}
