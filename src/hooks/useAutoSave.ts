import { useEffect } from 'react';
import { saveCode, loadCode } from '../engine/storage';

export function useAutoSave(
  code: string,
  onLoad: (code: string) => void,
): void {
  // Load saved code on mount
  useEffect(() => {
    const saved = loadCode();
    if (saved !== null) {
      onLoad(saved);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced save on code change
  useEffect(() => {
    const timer = setTimeout(() => {
      saveCode(code);
    }, 1000);
    return () => clearTimeout(timer);
  }, [code]);
}
