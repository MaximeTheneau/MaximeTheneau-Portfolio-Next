import { useState, useEffect } from 'react';

export default function useSlideTransition(elementRef, delay) {
  const [isInViewport, setIsInViewport] = useState(false);
  const [offset, setOffset] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const scrollTop = window.pageYOffset;
        const { top } = elementRef.current.getBoundingClientRect();
        setOffset({
          opacity: top / 100,
          translateY: top / 100,
        });

        // setIsInViewport(isInViewportTest);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [elementRef]);

  useEffect(() => {
    if (!elementRef.current) return;
    elementRef.current.style.setProperty('opacity', `${offset?.opacity}`);
    elementRef.current.style.setProperty('transform', `translateY(-${offset?.translateY}px) rotateX(${offset?.opacity}deg)`);
  }, [elementRef, offset]);

  return isInViewport;
}
