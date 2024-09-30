import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useState } from 'react';
import useDidUpdate from './use-did-update';

describe('GIVEN useDidUpdate', () => {
  test('WHEN a component does mount THEN useDidUpdate should not have been runned', () => {
    const { result } = renderHook(() => {
      const [runned, setRunned] = useState<number>(0);
      useDidUpdate(() => {
        console.log('mount');
        setRunned((prev) => prev + 1);
      }, []);
      return runned;
    });

    expect(result.current).toEqual(0);
  });
  test('WHEN a component does mount and rerender with changed props THEN useDidUpdate should only been called one time', () => {
    const { result, rerender } = renderHook((props: { hej?: string } = { hej: 'initial' }) => {
      const [runned, setRunned] = useState<number>(0);

      useDidUpdate(() => {
        setRunned((prev) => prev + 1);
      }, [props.hej]);
      return runned;
    });
    expect(result.current).toEqual(0);
    rerender({ hej: 'changed' });
    expect(result.current).toEqual(1);
  });

  test('WHEN a component does mount and rerender with changed props and then again with the same props THEN useDidUpdate should only been called one time', () => {
    const { result, rerender } = renderHook((props: { hej?: string } = { hej: 'initial' }) => {
      const [runned, setRunned] = useState<number>(0);

      useDidUpdate(() => {
        setRunned((prev) => prev + 1);
      }, [props.hej]);
      return runned;
    });
    expect(result.current).toEqual(0);
    rerender({ hej: 'changed' });
    expect(result.current).toEqual(1);
    rerender({ hej: 'changed' });
    expect(result.current).toEqual(1);
  });
});
