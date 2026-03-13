import { useEffect, useState } from 'react';

/**
 * iOSでソフトキーボードが表示されたとき、visualViewport.height が縮小する。
 * window.innerHeight は変わらないため、このhookでキーボード表示後の
 * 実際の表示可能領域の高さを追跡する。
 */
export function useVisualViewport(): number | undefined {
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => setHeight(vv.height);
    vv.addEventListener('resize', update);
    update();

    return () => vv.removeEventListener('resize', update);
  }, []);

  return height;
}
