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

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key !== 'Enter' && e.key !== 'Tab') return;

        e.preventDefault();
        const el = e.currentTarget;
        const { selectionStart, selectionEnd } = el;

        let result: { newCode: string; newCursorPos: number };
        if (e.key === 'Enter') {
          result = handleEnterKey(code, selectionStart, selectionEnd);
        } else if (e.shiftKey) {
          result = handleShiftTabKey(code, selectionStart, selectionEnd);
        } else {
          result = handleTabKey(code, selectionStart, selectionEnd);
        }

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
