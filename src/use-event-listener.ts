'use client';

import { RefObject, useEffect, useRef } from 'react';

export type Target = null | EventTarget | RefObject<EventTarget | null> | (() => EventTarget | null);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Options = boolean | (AddEventListenerOptions & { shouldInjectEvent?: boolean | any });
export type Handler = (event: Event) => void;

export function useEventListener<K extends keyof DocumentEventMap>(
  target: Target,
  event: K,
  handler?: (event: DocumentEventMap[K]) => void,
  options?: Options,
): void;
export function useEventListener<K extends keyof WindowEventMap>(
  target: Target,
  event: K,
  handler?: (event: WindowEventMap[K]) => void,
  options?: Options,
): void;
export function useEventListener<K extends keyof GlobalEventHandlersEventMap>(
  target: Target,
  event: K,
  handler?: (event: GlobalEventHandlersEventMap[K]) => void,
  options?: Options,
): void;

export default function useEventListener(target: Target, event: string, handler?: Handler, options?: Options) {
  const listener = useRef({ handler, options });

  let shouldInjectEvent = true;
  if (typeof options == 'object' && 'shouldInjectEvent' in options) {
    shouldInjectEvent = !!options.shouldInjectEvent;
  }

  useEffect(() => {
    const node = typeof target === 'function' ? target() : target;

    if (!listener.current.handler || !node) return;

    const callback = (e: Event) => listener.current.handler?.(e);
    const options = listener.current.options;

    if (shouldInjectEvent) {
      if ('current' in node) {
        node.current?.addEventListener(event, callback, options);
      } else {
        node.addEventListener(event, callback, options);
      }
    }

    return () => {
      if ('current' in node) {
        node.current?.removeEventListener(event, callback, options);
      } else {
        node.removeEventListener(event, callback, options);
      }
    };
  }, [event, target, shouldInjectEvent]);
}
