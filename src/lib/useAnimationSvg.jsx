import { useRef, useEffect, useState } from 'react';

export default function useAnimationSvg({ refElement }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const element = refElement.current;
    if (!element) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [refElement]);

  return isVisible;
}
