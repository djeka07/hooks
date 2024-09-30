'use client';
import { useCallback, useEffect, useRef } from 'react';

const useInterval = (callback: () => void, interval = 100) => {
  const intervalId = useRef<NodeJS.Timeout>();

  const clear = useCallback(() => {
    clearInterval(intervalId.current);
  }, []);

  const restart = useCallback(
    (newInterval: number) => {
      clear();
      intervalId.current = setInterval(callback, newInterval ?? interval);
    },
    [callback, clear, interval],
  );

  useEffect(() => {
    intervalId.current = setInterval(callback, interval);
    return clear;
  }, [callback, clear, interval]);

  return {
    clear,
    restart,
  };
};

export default useInterval;
