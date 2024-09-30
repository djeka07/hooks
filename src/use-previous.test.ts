import { describe, test, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import usePrevious from './use-previous';
import React, { useState } from 'react';

describe('GIVEN usePrevious', () => {
  test('WHEN first render THEN current should be undefined', () => {
    const { result } = renderHook(() => usePrevious('test'));
    expect(result.current).toBeUndefined();
  });

  test('WHEN update state in useEffect THEN previous should be initial state', () => {
    const { result } = renderHook(() => {
      const [name, setName] = useState<string>('first');
      const prev = usePrevious(name);

      React.useEffect(() => {
        setName('second');
      }, []);

      return prev;
    });

    expect(result.current).toEqual('first');
  });
  test('WHEN update state in useEffect and rerender THEN previous should be the state set in mount', () => {
    const { result, rerender } = renderHook(() => {
      const [name, setName] = useState<string>('first');
      const prev = usePrevious(name);

      React.useEffect(() => {
        setName('second');
      }, []);

      return prev;
    });

    expect(result.current).toEqual('first');
    rerender();
    expect(result.current).toEqual('second');
  });
});
