import { RefObject, useEffect, useRef, useState } from 'react';

const useFirstInViewport = (ref: RefObject<HTMLElement | null>, observerOptions: IntersectionObserverInit) => {
  const [entered, setEntered] = useState(false);
  const observerRef = useRef(
    new IntersectionObserver(([entry]) => {
      if (entry) {
        setEntered(entry.isIntersecting);
      }
    }, observerOptions),
  );

  useEffect(() => {
    const currentRef = ref.current;
    const currentObserver = observerRef.current;

    if (entered) {
      currentObserver.disconnect();
      return;
    }
    if (currentRef && !entered) {
      currentObserver.observe(currentRef);
      return;
    }

    return () => currentObserver.disconnect();
  }, [entered, ref]);

  return entered;
};

export default useFirstInViewport;
