import { useRef, useCallback } from 'react';
import './Editor.css';

interface EditorProps {
  code: string;
  onChange: (code: string) => void;
  onCursorChange: (pos: number) => void;
}

export function Editor({ code, onChange, onCursorChange }: EditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

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

  return (
    <div className="editor-wrapper">
      <textarea
        ref={ref}
        className="editor-textarea"
        value={code}
        onChange={handleChange}
        onSelect={handleSelect}
        onClick={handleSelect}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        aria-label="Rust code editor"
      />
    </div>
  );
}
