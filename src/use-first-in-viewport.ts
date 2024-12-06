'use client';

import { RefObject, useEffect, useRef, useState } from 'react';

const useFirstInViewport = (
  ref: RefObject<HTMLElement | null>,
  { triggerOnce, ...rest }: IntersectionObserverInit & { triggerOnce?: boolean } = { triggerOnce: true },
) => {
  const [entered, setEntered] = useState(false);
  const intersectRef = useRef<IntersectionObserver>(null);

  useEffect(() => {
    console.log(intersectRef);
    const currentRef = ref.current;
    const currentIntersectRef = intersectRef.current;
    if (!intersectRef.current) {
      intersectRef.current = new IntersectionObserver(([entry]) => {
        if (entry) {
          setEntered(entry.isIntersecting);
        }
      }, rest);
    }

    console.log(entered, triggerOnce);
    if (entered && triggerOnce && !!currentIntersectRef) {
      intersectRef.current.disconnect();
      return;
    }
    if (currentRef && !entered) {
      intersectRef.current.observe(currentRef);
      return;
    }

    return () => intersectRef?.current?.disconnect();
  }, [entered, rest, ref, triggerOnce]);

  return entered;
};

export default useFirstInViewport;
