'use client';

import { useRef } from 'react';
import { default as useEventListener, Handler, Target } from './use-event-listener';

interface Options {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shouldInjectEvent?: boolean | any;
}

const useClickOutside = (target: Target, handler: (event: DocumentEventMap['click']) => void, options?: Options) => {
  const paramsRef = useRef({
    target,
    handler,
  });
  let shouldInjectEvent = true;
  if (typeof options == 'object' && 'shouldInjectEvent' in options) {
    shouldInjectEvent = !!options.shouldInjectEvent;
  }

  const eventCb = useRef((event: DocumentEventMap['click']) => {
    const node = (typeof target == 'function' ? target() : target) ?? document;
    if (event.target == node || ('current' in node && event.target == node.current)) return;
    if (
      node &&
      (('contains' in node && (node as Node).contains(event.target as Node)) ||
        ('current' in node && 'contains' && (node.current as Node).contains(event.target as Node)))
    ) {
      return;
    }
    paramsRef.current.handler(event);
  });

  useEventListener(document, 'click', eventCb.current as Handler, { shouldInjectEvent });
};

export default useClickOutside;
