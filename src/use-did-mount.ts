'use client';
import { EffectCallback, useEffect } from 'react';

const useDidMount = (callback: EffectCallback): void => {
  useEffect(() => {
    return callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useDidMount;
