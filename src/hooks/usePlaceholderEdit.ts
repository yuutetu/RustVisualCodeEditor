import { useState, useCallback } from 'react';
import type { Placeholder, Template } from '../templates/types';
import { replacePlaceholder } from '../engine/placeholder';

interface PlaceholderEditState {
  isOpen: boolean;
  current: Placeholder | null;
  queueIndex: number;
  queue: Placeholder[];
}

export function usePlaceholderEdit(
  code: string,
  setCode: (code: string) => void,
) {
  const [state, setState] = useState<PlaceholderEditState>({
    isOpen: false,
    current: null,
    queueIndex: 0,
    queue: [],
  });

  const startEditing = useCallback(
    (template: Template) => {
      if (template.placeholders.length === 0) return;
      setState({
        isOpen: true,
        current: template.placeholders[0],
        queueIndex: 0,
        queue: template.placeholders,
      });
    },
    [],
  );

  const confirm = useCallback(
    (newValue: string) => {
      if (!state.current) return;

      const updatedCode = replacePlaceholder(code, state.current.name, newValue);
      setCode(updatedCode);

      const nextIndex = state.queueIndex + 1;
      if (nextIndex < state.queue.length) {
        setState(prev => ({
          ...prev,
          queueIndex: nextIndex,
          current: prev.queue[nextIndex],
        }));
      } else {
        setState(prev => ({ ...prev, isOpen: false, current: null }));
      }
    },
    [state, code, setCode],
  );

  const cancel = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false, current: null }));
  }, []);

  return { isOpen: state.isOpen, current: state.current, startEditing, confirm, cancel };
}
