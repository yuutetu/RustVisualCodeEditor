import { useState, useCallback } from 'react';
import { Editor } from './components/Editor/Editor';
import { TemplatePanel } from './components/TemplatePanel/TemplatePanel';
import { PlaceholderModal } from './components/PlaceholderModal/PlaceholderModal';
import { Toolbar } from './components/Toolbar/Toolbar';
import { TEMPLATES } from './templates/index';
import type { Template } from './templates/types';
import { insertAtCursor, insertAtAnchor } from './engine/insertion';
import { useAutoSave } from './hooks/useAutoSave';
import { usePlaceholderEdit } from './hooks/usePlaceholderEdit';
import { useVisualViewport } from './hooks/useVisualViewport';
import './App.css';

export default function App() {
  const [code, setCode] = useState('');
  const [cursorPos, setCursorPos] = useState(0);
  const viewportHeight = useVisualViewport();

  useAutoSave(code, setCode);

  const { isOpen, current, startEditing, confirm, cancel } = usePlaceholderEdit(
    code,
    setCode,
  );

  const handleInsert = useCallback(
    (template: Template) => {
      let result: { newCode: string; newCursorPos: number };
      if (template.insertion.type === 'cursor') {
        result = insertAtCursor(code, cursorPos, template.body);
      } else {
        result = insertAtAnchor(code, template.insertion.anchor, template.body);
      }
      setCode(result.newCode);
      setCursorPos(result.newCursorPos);

      if (template.placeholders.length > 0) {
        startEditing(template);
      }
    },
    [code, cursorPos, startEditing],
  );

  const handleClear = useCallback(() => {
    setCode('');
    setCursorPos(0);
  }, []);

  const appStyle = viewportHeight ? { height: `${viewportHeight}px` } : undefined;

  return (
    <div className="app" style={appStyle}>
      <Toolbar code={code} onClear={handleClear} />
      <Editor
        code={code}
        onChange={setCode}
        onCursorChange={setCursorPos}
      />
      <TemplatePanel templates={TEMPLATES} onInsert={handleInsert} />
      {isOpen && current && (
        <PlaceholderModal
          placeholder={current}
          onConfirm={confirm}
          onCancel={cancel}
        />
      )}
    </div>
  );
}
