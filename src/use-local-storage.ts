'use client';

import { Dispatch, useCallback, useState } from 'react';

export const useLocaleStorage = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      return JSON.parse(item!) as T;
    } catch {
      return initialValue;
    }
  });
  const updateState: Dispatch<React.SetStateAction<T>> = useCallback(
    (value: T | ((state: T) => T)) => {
      if (typeof value == 'function') {
        setState((prev) => {
          const newValue = (value as (state: T) => T)(prev);
          localStorage.setItem(key, JSON.stringify(newValue));
          return newValue;
        });
      } else {
        setState(value);
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [key],
  );
  return [state, updateState] as const;
};
