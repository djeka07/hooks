'use client';
import { debounce } from '@djeka07/utils';
import { useEffect, useState } from 'react';

export type Dimension = {
  width: number;
  height: number;
};

const getElementSize = (element: HTMLElement): Dimension => {
  const { width, height } = element.getBoundingClientRect();
  return { width, height };
};

const useElementSize = (element: HTMLElement | null, debounceMs = 100) => {
  const [size, setSize] = useState<Dimension | null>(() => (element ? getElementSize(element) : null));

  useEffect(() => {
    if (!element) {
      return;
    }

    const handleElementChange = debounce(() => {
      setSize(getElementSize(element));
    }, debounceMs);

    setSize(getElementSize(element));

    if (!window?.ResizeObserver) {
      return;
    }

    const resizeObserver = new ResizeObserver(handleElementChange);

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [element, debounceMs]);

  return size;
};

export default useElementSize;
