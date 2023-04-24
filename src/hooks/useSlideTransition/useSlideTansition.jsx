import { useState, useEffect } from 'react';

export default function useSlideTransition(elementRef) {
  const [isInViewport, setIsInViewport] = useState(false);

  function handleScroll() {
    const {
      top, bottom, left, right,
    } = elementRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    setIsInViewport(top < windowHeight && bottom >= 0 && left < windowWidth && right >= 0);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [elementRef]);

  return isInViewport;
}