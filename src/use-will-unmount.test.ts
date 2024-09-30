import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useState } from 'react';
import useWillUnmount from './use-will-unmount';

describe('GIVEN useDidMount', () => {
  test('WHEN a component does mount THEN useWillMount should not have been have been runned', () => {
    const { result } = renderHook(() => {
      const [runned, setRunned] = useState<number>(0);
      useWillUnmount(() => {
        setRunned((prev) => prev + 1);
      });
      return runned;
    });

    expect(result.current).toEqual(0);
  });
  test('WHEN a component does mount and rerender THEN useWillMount should not have been runned', () => {
    const { result, rerender } = renderHook(() => {
      const [runned, setRunned] = useState<number>(0);
      useWillUnmount(() => {
        setRunned((prev) => prev + 1);
      });
      return runned;
    });
    expect(result.current).toEqual(0);
    rerender();
    expect(result.current).toEqual(0);
  });
  test('WHEN a component does unmount THEN useWillMount should have been runned once', () => {
    const { result, unmount } = renderHook(() => {
      const [runned, setRunned] = useState<number>(0);
      useWillUnmount(() => {
        setRunned((prev) => prev + 1);
      });
      return runned;
    });
    unmount();
    expect(result.current).toEqual(0);
  });
});
