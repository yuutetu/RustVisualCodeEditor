// @vitest-environment jsdom
import { renderHook, act } from '@testing-library/react';
import { useRef } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useEditorCursor } from './useEditorCursor';

describe('useEditorCursor', () => {
  let textarea: HTMLTextAreaElement;

  beforeEach(() => {
    textarea = document.createElement('textarea');
    textarea.value = 'hello world';
    document.body.appendChild(textarea);
  });

  function renderWithTextarea(onCursorChange: (pos: number) => void) {
    return renderHook(() => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const ref = useRef<HTMLTextAreaElement | null>(textarea);
      return useEditorCursor(ref, onCursorChange);
    });
  }

  describe('handleSelect', () => {
    it('カーソル位置を onCursorChange に通知する', () => {
      const onCursorChange = vi.fn();
      const { result } = renderWithTextarea(onCursorChange);

      const fakeEvent = {
        target: { selectionStart: 5 },
      } as React.SyntheticEvent<HTMLTextAreaElement>;

      act(() => {
        result.current.handleSelect(fakeEvent);
      });

      expect(onCursorChange).toHaveBeenCalledWith(5);
    });

    it('位置 0 でも通知する', () => {
      const onCursorChange = vi.fn();
      const { result } = renderWithTextarea(onCursorChange);

      const fakeEvent = {
        target: { selectionStart: 0 },
      } as React.SyntheticEvent<HTMLTextAreaElement>;

      act(() => {
        result.current.handleSelect(fakeEvent);
      });

      expect(onCursorChange).toHaveBeenCalledWith(0);
    });
  });

  describe('setPendingCursor', () => {
    it('次のレイアウトエフェクトで textarea のカーソルを設定する', () => {
      const onCursorChange = vi.fn();
      const { result, rerender } = renderWithTextarea(onCursorChange);

      act(() => {
        result.current.setPendingCursor(3);
      });

      rerender();

      expect(textarea.selectionStart).toBe(3);
      expect(textarea.selectionEnd).toBe(3);
    });

    it('カーソル設定後に onCursorChange を呼ぶ', () => {
      const onCursorChange = vi.fn();
      const { result, rerender } = renderWithTextarea(onCursorChange);

      act(() => {
        result.current.setPendingCursor(7);
      });

      rerender();

      expect(onCursorChange).toHaveBeenCalledWith(7);
    });
  });
});
