import { useEffect, useRef, useState } from 'react';

export default function useIntersectionObserver(options) {
  const [isIntersecting, setIntersecting] = useState(false);
  const element = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (element.current) {
      observer.observe(element.current);
    }

    return () => {
      observer.unobserve(element.current);
    };
  }, [options]);

  return [element, isIntersecting];
}
