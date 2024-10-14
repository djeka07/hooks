'use client';
import { useState } from 'react';
import useDidUpdate from './use-did-update';

const useDebounce = <T = string>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useDidUpdate(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
