import {
  useEffect, useState, RefObject,
} from 'react';

const useScrollParallaxTop = (elementRef: RefObject<HTMLDivElement>) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { top } = elementRef.current.getBoundingClientRect();
      const parallacEffect = (top / window.innerHeight) * 20;
      setScrollPosition(parallacEffect);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef]);

  return { scrollPosition };
};

export default useScrollParallaxTop;
