import { useEffect, useRef, useState } from 'react';
import type { Placeholder } from '../../templates/types';
import './PlaceholderModal.css';

interface PlaceholderModalProps {
  placeholder: Placeholder;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

export function PlaceholderModal({ placeholder, onConfirm, onCancel }: PlaceholderModalProps) {
  const [value, setValue] = useState(placeholder.defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(placeholder.defaultValue);
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [placeholder]);

  const handleConfirm = () => {
    onConfirm(value.trim() || placeholder.defaultValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleConfirm();
    if (e.key === 'Escape') onCancel();
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <p className="modal-label">
          <span className="modal-name">{`{{${placeholder.name}}}`}</span>
          <span className="modal-kind">{placeholder.kind}</span>
        </p>
        <input
          ref={inputRef}
          className="modal-input"
          type={placeholder.kind === 'number' ? 'number' : 'text'}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="modal-buttons">
          <button className="modal-btn modal-cancel" onClick={onCancel} type="button">
            キャンセル
          </button>
          <button className="modal-btn modal-confirm" onClick={handleConfirm} type="button">
            確定
          </button>
        </div>
      </div>
    </div>
  );
}
