import {
  useEffect, useState, RefObject,
} from 'react';

const useScrollParallaxTop = (elementRef: RefObject<HTMLDivElement>) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const { top } = elementRef.current.getBoundingClientRect();
        const parallaxEffect = (top / window.innerHeight) * 20;

        if (parallaxEffect >= 0 && parallaxEffect <= 100) {
          setScrollPosition(parallaxEffect * 5);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef]);

  return { scrollPosition };
};

export default useScrollParallaxTop;
