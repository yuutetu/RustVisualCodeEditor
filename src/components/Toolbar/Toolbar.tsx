import { useState, useCallback } from 'react';
import './Toolbar.css';

interface ToolbarProps {
  onClear: () => void;
  code: string;
}

export function Toolbar({ onClear, code }: ToolbarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback for environments without clipboard API
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }, [code]);

  const handleClear = useCallback(() => {
    if (window.confirm('コードをクリアしますか？')) {
      onClear();
    }
  }, [onClear]);

  return (
    <div className="toolbar">
      <span className="toolbar-title">Rust Editor</span>
      <div className="toolbar-actions">
        <button
          className={`toolbar-btn${copied ? ' toolbar-btn-copied' : ''}`}
          onClick={handleCopy}
          type="button"
        >
          {copied ? '✓ コピー完了' : 'Copy'}
        </button>
        <button
          className="toolbar-btn toolbar-btn-danger"
          onClick={handleClear}
          type="button"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
