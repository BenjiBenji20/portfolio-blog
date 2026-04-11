import { useEffect, useRef, useState } from 'react';

interface IntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export function useIntersectionObserver({
  root = null,
  rootMargin = '0px',
  threshold = 0,
}: IntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { root, rootMargin, threshold }
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [root, rootMargin, threshold]);

  return { targetRef, isIntersecting };
}
