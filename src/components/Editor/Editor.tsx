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
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // iOS Safari では requestAnimationFrame でのカーソル位置設定が
    // React の再レンダリング後にリセットされる場合がある。
    // useLayoutEffect を使い、再レンダリング直後（描画前）に同期的に設定することで確実に反映させる。
    useLayoutEffect(() => {
      if (pendingCursorRef.current === null) return;
      const el = textareaRef.current;
      if (!el) return;
      const pos = pendingCursorRef.current;
      pendingCursorRef.current = null;
      el.selectionStart = pos;
      el.selectionEnd = pos;
      onCursorChange(pos);
    });

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
