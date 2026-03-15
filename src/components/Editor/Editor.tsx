import { forwardRef, useRef } from 'react';
import './Editor.css';
import { useEditorCursor } from '../../hooks/useEditorCursor';
import { useEditorKeyHandlers } from '../../hooks/useEditorKeyHandlers';

interface EditorProps {
  code: string;
  onChange: (code: string) => void;
  onCursorChange: (pos: number) => void;
}

export const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(
  function Editor({ code, onChange, onCursorChange }, ref) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const { setPendingCursor, handleSelect } = useEditorCursor(textareaRef, onCursorChange);
    const { handleChange, handleBeforeInput, handleKeyDown } = useEditorKeyHandlers({
      code,
      onChange,
      setPendingCursor,
    });

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
