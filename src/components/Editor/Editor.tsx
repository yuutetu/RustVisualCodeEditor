import { forwardRef, useCallback, useLayoutEffect, useRef } from 'react';
import './Editor.css';
import { handleEnterKey, handleTabKey, handleShiftTabKey } from '../../engine/indentation';

interface EditorProps {
  code: string;
  onChange: (code: string) => void;
  onCursorChange: (pos: number) => void;
}

export const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(
  function Editor({ code, onChange, onCursorChange }, ref) {
    const pendingCursorRef = useRef<number | null>(null);
    // onCursorChange が setCursorPos を呼び出し App が再レンダリングされると、
    // iOS Safari がカーソル位置をリセットすることがある。
    // protectCursorRef に位置を残し、その次のレンダリングでも再設定することで対処する。
    const protectCursorRef = useRef<number | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    // iOS によっては e.preventDefault() 後も input イベントが発火し、
    // handleChange がインデント済みコードを上書きする場合があるため、フラグで抑制する。
    const enterHandledRef = useRef(false);

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

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // iOS では beforeinput で preventDefault() を呼んでも input イベントが
        // 発火することがある。その場合は enterHandledRef フラグで変更を無視する。
        if (enterHandledRef.current) {
          enterHandledRef.current = false;
          return;
        }
        onChange(e.target.value);
      },
      [onChange],
    );

    const handleSelect = useCallback(
      (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        onCursorChange((e.target as HTMLTextAreaElement).selectionStart);
      },
      [onCursorChange],
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
        pendingCursorRef.current = result.newCursorPos;
        onChange(result.newCode);
      },
      [code, onChange],
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

        pendingCursorRef.current = result.newCursorPos;
        onChange(result.newCode);
      },
      [code, onChange],
    );

    return (
      <div className="editor-wrapper">
        <textarea
          ref={(el) => {
            textareaRef.current = el;
            if (typeof ref === 'function') ref(el);
            else if (ref) ref.current = el;
          }}
          className="editor-textarea"
          value={code}
          onChange={handleChange}
          onSelect={handleSelect}
          onClick={handleSelect}
          onBeforeInput={handleBeforeInput}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          aria-label="Rust code editor"
        />
      </div>
    );
  },
);
