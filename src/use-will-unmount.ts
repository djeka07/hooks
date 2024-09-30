'use client';
import { useEffect } from 'react';

const useWillUnmount = (callback: () => void): void => {
  useEffect(
    () => () => {
      callback();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};

export default useWillUnmount;
