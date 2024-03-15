import {
  useEffect, useState, RefObject,
} from 'react';

const useScrollParallaxTop = (elementRef: RefObject<HTMLDivElement>) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { top } = elementRef.current.getBoundingClientRect();
      const parallacEffect = (top / window.innerHeight) * 20;

      if (parallacEffect >= 0 && parallacEffect <= 100) {
        setScrollPosition(parallacEffect * 5);
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
