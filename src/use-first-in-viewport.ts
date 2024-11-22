import { RefObject, useEffect, useState } from 'react';

const useFirstInViewport = (
  ref: RefObject<HTMLElement | null>,
  { triggerOnce, ...rest }: IntersectionObserverInit & { triggerOnce?: boolean } = { triggerOnce: true },
) => {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    console.log('running effect');
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        setEntered(entry.isIntersecting);
      }
    }, rest);

    if (entered && triggerOnce) {
      observer.disconnect();
      return;
    }
    if (currentRef && !entered) {
      observer.observe(currentRef);
      return;
    }

    return () => observer.disconnect();
  }, [entered, rest, ref, triggerOnce]);

  return entered;
};

export default useFirstInViewport;
