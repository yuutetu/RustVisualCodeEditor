import { forwardRef, useCallback } from 'react';
import './Editor.css';
import { handleEnterKey, handleTabKey, handleShiftTabKey } from '../../engine/indentation';

interface EditorProps {
  code: string;
  onChange: (code: string) => void;
  onCursorChange: (pos: number) => void;
}

export const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(
  function Editor({ code, onChange, onCursorChange }, ref) {
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

    // Enter キー: beforeinput で処理（Android ソフトキーボード対応）
    const handleBeforeInput = useCallback(
      (e: React.FormEvent<HTMLTextAreaElement>) => {
        const inputType = (e.nativeEvent as InputEvent).inputType;
        if (inputType !== 'insertLineBreak') return;

        e.preventDefault();
        const el = e.currentTarget;
        const result = handleEnterKey(code, el.selectionStart, el.selectionEnd);
        onChange(result.newCode);
        requestAnimationFrame(() => {
          el.selectionStart = result.newCursorPos;
          el.selectionEnd = result.newCursorPos;
          onCursorChange(result.newCursorPos);
        });
      },
      [code, onChange, onCursorChange],
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

        onChange(result.newCode);
        requestAnimationFrame(() => {
          el.selectionStart = result.newCursorPos;
          el.selectionEnd = result.newCursorPos;
          onCursorChange(result.newCursorPos);
        });
      },
      [code, onChange, onCursorChange],
    );

    return (
      <div className="editor-wrapper">
        <textarea
          ref={ref}
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
