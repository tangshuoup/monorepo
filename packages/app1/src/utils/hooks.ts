import { useEffect, useRef, useState } from 'react';
/**
 * 数据监听自定义hook, 第一次渲染不执行
 * @param fn
 * @param arr
 */
export const useDidUpdateEffect = (fn, inputs) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs);
};

/**
 * 计算layout高度
 */
export const useLayoutHeight = () => {
  const [height, setHeight] = useState(
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0,
  );

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return height;
};
