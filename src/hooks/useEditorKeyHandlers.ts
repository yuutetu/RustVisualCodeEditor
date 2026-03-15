import { useCallback, useRef } from 'react';
import { handleEnterKey, handleTabKey, handleShiftTabKey } from '../engine/indentation';

interface Params {
  code: string;
  onChange: (code: string) => void;
  setPendingCursor: (pos: number) => void;
}

export function useEditorKeyHandlers({ code, onChange, setPendingCursor }: Params) {
  // iOS によっては e.preventDefault() 後も input イベントが発火し、
  // handleChange がインデント済みコードを上書きする場合があるため、フラグで抑制する。
  const enterHandledRef = useRef(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (enterHandledRef.current) {
        enterHandledRef.current = false;
        return;
      }
      onChange(e.target.value);
    },
    [onChange],
  );

  // Enter キー: beforeinput で処理（Android / iOS ソフトキーボード対応）
  const handleBeforeInput = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      const inputType = (e.nativeEvent as InputEvent).inputType;
      if (inputType !== 'insertLineBreak') return;

      e.preventDefault();
      // iOS が input イベントを発火した場合に handleChange で無視できるようフラグを立てる。
      // setTimeout(0) で次のタスクにリセットし、他のキー入力に影響が出ないようにする。
      enterHandledRef.current = true;
      setTimeout(() => {
        enterHandledRef.current = false;
      }, 0);
      const el = e.currentTarget;
      const result = handleEnterKey(code, el.selectionStart, el.selectionEnd);
      setPendingCursor(result.newCursorPos);
      onChange(result.newCode);
    },
    [code, onChange, setPendingCursor],
  );

  // Tab / Shift+Tab: ソフトキーボードにはTabキーがないため keydown で十分
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== 'Tab') return;

      e.preventDefault();
      const el = e.currentTarget;
      const { selectionStart, selectionEnd } = el;
      const result = e.shiftKey
        ? handleShiftTabKey(code, selectionStart, selectionEnd)
        : handleTabKey(code, selectionStart, selectionEnd);

      setPendingCursor(result.newCursorPos);
      onChange(result.newCode);
    },
    [code, onChange, setPendingCursor],
  );

  return { handleChange, handleBeforeInput, handleKeyDown };
}
