import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import useDidMount from './use-did-mount';
import { useState } from 'react';

describe('GIVEN useDidMount', () => {
  test('WHEN a component does mount THEN useDidMount should have been runned', () => {
    const { result } = renderHook(() => {
      const [runned, setRunned] = useState<number>(0);
      useDidMount(() => {
        console.log('mount');
        setRunned((prev) => prev + 1);
      });
      return runned;
    });

    expect(result.current).toEqual(1);
  });
  test('WHEN a component does mount and rerender THEN useDidMount should only been called one time', () => {
    const { result, rerender } = renderHook(() => {
      const [runned, setRunned] = useState<number>(0);
      useDidMount(() => {
        setRunned((prev) => prev + 1);
      });
      return runned;
    });
    expect(result.current).toEqual(1);
    rerender();
    expect(result.current).toEqual(1);
  });
});
