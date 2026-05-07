import { useEffect, useState } from 'react';

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
  const [targetNode, setTargetNode] = useState<Element | null>(null);

  useEffect(() => {
    if (!targetNode) {
      setIsIntersecting(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { root, rootMargin, threshold }
    );

    observer.observe(targetNode);

    return () => {
      observer.disconnect();
    };
  }, [targetNode, root, rootMargin, threshold]);

  return { targetRef: setTargetNode as any, isIntersecting };
}
