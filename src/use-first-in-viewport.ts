import { RefObject, useEffect, useState } from 'react';

const useFirstInViewport = (ref: RefObject<HTMLElement | null>, observerOptions: IntersectionObserverInit) => {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    console.log('running effect');
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        setEntered(entry.isIntersecting);
      }
    }, observerOptions);

    if (entered) {
      observer.disconnect();
      return;
    }
    if (currentRef && !entered) {
      observer.observe(currentRef);
      return;
    }

    return () => observer.disconnect();
  }, [entered, observerOptions, ref]);

  return entered;
};

export default useFirstInViewport;
