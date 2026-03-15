// @vitest-environment jsdom
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useEditorKeyHandlers } from './useEditorKeyHandlers';

function makeTextarea(value: string, selectionStart: number, selectionEnd = selectionStart) {
  const el = document.createElement('textarea');
  el.value = value;
  el.selectionStart = selectionStart;
  el.selectionEnd = selectionEnd;
  return el;
}

describe('useEditorKeyHandlers', () => {
  describe('handleChange', () => {
    it('onChange に新しいコードを渡す', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useEditorKeyHandlers({ code: 'old', onChange, setPendingCursor: vi.fn() }),
      );

      const fakeEvent = {
        target: { value: 'new code' },
      } as React.ChangeEvent<HTMLTextAreaElement>;

      act(() => result.current.handleChange(fakeEvent));

      expect(onChange).toHaveBeenCalledWith('new code');
    });
  });

  describe('handleBeforeInput', () => {
    it('insertLineBreak 以外では何もしない', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useEditorKeyHandlers({ code: 'fn main() {}', onChange, setPendingCursor: vi.fn() }),
      );

      const fakeEvent = {
        nativeEvent: new InputEvent('beforeinput', { inputType: 'insertText' }),
        preventDefault: vi.fn(),
        currentTarget: makeTextarea('fn main() {}', 3),
      } as unknown as React.FormEvent<HTMLTextAreaElement>;

      act(() => result.current.handleBeforeInput(fakeEvent));

      expect(onChange).not.toHaveBeenCalled();
    });

    it('insertLineBreak で自動インデントされたコードを onChange に渡す', () => {
      const code = 'fn main() {\n    ';
      const onChange = vi.fn();
      const setPendingCursor = vi.fn();
      const { result } = renderHook(() =>
        useEditorKeyHandlers({ code, onChange, setPendingCursor }),
      );

      const textarea = makeTextarea(code, code.length);
      const fakeEvent = {
        nativeEvent: new InputEvent('beforeinput', { inputType: 'insertLineBreak' }),
        preventDefault: vi.fn(),
        currentTarget: textarea,
      } as unknown as React.FormEvent<HTMLTextAreaElement>;

      act(() => result.current.handleBeforeInput(fakeEvent));

      expect(onChange).toHaveBeenCalled();
      const newCode: string = onChange.mock.calls[0][0];
      expect(newCode).toContain('\n');
    });

    it('insertLineBreak で setPendingCursor を呼ぶ', () => {
      const code = 'fn main() {}';
      const setPendingCursor = vi.fn();
      const { result } = renderHook(() =>
        useEditorKeyHandlers({ code, onChange: vi.fn(), setPendingCursor }),
      );

      const textarea = makeTextarea(code, 6);
      const fakeEvent = {
        nativeEvent: new InputEvent('beforeinput', { inputType: 'insertLineBreak' }),
        preventDefault: vi.fn(),
        currentTarget: textarea,
      } as unknown as React.FormEvent<HTMLTextAreaElement>;

      act(() => result.current.handleBeforeInput(fakeEvent));

      expect(setPendingCursor).toHaveBeenCalledWith(expect.any(Number));
    });

    it('handleChange が Enter 後の input イベントを無視する', () => {
      vi.useFakeTimers();
      const onChange = vi.fn();
      const code = 'hello';
      const { result } = renderHook(() =>
        useEditorKeyHandlers({ code, onChange, setPendingCursor: vi.fn() }),
      );

      const textarea = makeTextarea(code, 5);
      const beforeInputEvent = {
        nativeEvent: new InputEvent('beforeinput', { inputType: 'insertLineBreak' }),
        preventDefault: vi.fn(),
        currentTarget: textarea,
      } as unknown as React.FormEvent<HTMLTextAreaElement>;

      act(() => result.current.handleBeforeInput(beforeInputEvent));

      // Enter 直後（setTimeout(0) が発火する前）に handleChange が呼ばれても無視される
      const changeEvent = {
        target: { value: 'should be ignored' },
      } as React.ChangeEvent<HTMLTextAreaElement>;

      act(() => result.current.handleChange(changeEvent));

      // handleEnterKey が呼んだ onChange (1回) のみで、handleChange 由来の呼び出しは含まない
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).not.toHaveBeenCalledWith('should be ignored');

      vi.useRealTimers();
    });
  });

  describe('handleKeyDown', () => {
    it('Tab キーでインデントを追加する', () => {
      const code = 'hello';
      const onChange = vi.fn();
      const setPendingCursor = vi.fn();
      const { result } = renderHook(() =>
        useEditorKeyHandlers({ code, onChange, setPendingCursor }),
      );

      const textarea = makeTextarea(code, 5);
      const fakeEvent = {
        key: 'Tab',
        shiftKey: false,
        preventDefault: vi.fn(),
        currentTarget: textarea,
      } as unknown as React.KeyboardEvent<HTMLTextAreaElement>;

      act(() => result.current.handleKeyDown(fakeEvent));

      expect(onChange).toHaveBeenCalledWith('hello    ');
      expect(setPendingCursor).toHaveBeenCalledWith(9);
    });

    it('Shift+Tab キーでインデントを削除する', () => {
      const code = '    hello';
      const onChange = vi.fn();
      const setPendingCursor = vi.fn();
      const { result } = renderHook(() =>
        useEditorKeyHandlers({ code, onChange, setPendingCursor }),
      );

      const textarea = makeTextarea(code, 9);
      const fakeEvent = {
        key: 'Tab',
        shiftKey: true,
        preventDefault: vi.fn(),
        currentTarget: textarea,
      } as unknown as React.KeyboardEvent<HTMLTextAreaElement>;

      act(() => result.current.handleKeyDown(fakeEvent));

      expect(onChange).toHaveBeenCalledWith('hello');
      expect(setPendingCursor).toHaveBeenCalledWith(5);
    });

    it('Tab 以外のキーでは何もしない', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useEditorKeyHandlers({ code: 'hello', onChange, setPendingCursor: vi.fn() }),
      );

      const fakeEvent = {
        key: 'Enter',
        preventDefault: vi.fn(),
        currentTarget: makeTextarea('hello', 5),
      } as unknown as React.KeyboardEvent<HTMLTextAreaElement>;

      act(() => result.current.handleKeyDown(fakeEvent));

      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
