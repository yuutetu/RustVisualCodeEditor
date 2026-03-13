import { useEffect, useState } from 'react';

/**
 * iOSでソフトキーボードが表示されたとき、visualViewport.height が縮小する。
 * window.innerHeight は変わらないため、このhookでキーボード表示後の
 * 実際の表示可能領域の高さを追跡する。
 *
 * keyboardVisible: ビューポート高さがウィンドウ高さより150px以上縮小していればキーボード表示中とみなす
 */
export function useVisualViewport(): { height: number | undefined; keyboardVisible: boolean } {
  const [height, setHeight] = useState<number | undefined>(undefined);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => {
      setHeight(vv.height);
      setKeyboardVisible(window.innerHeight - vv.height > 150);
    };
    vv.addEventListener('resize', update);
    update();

    return () => vv.removeEventListener('resize', update);
  }, []);

  return { height, keyboardVisible };
}
