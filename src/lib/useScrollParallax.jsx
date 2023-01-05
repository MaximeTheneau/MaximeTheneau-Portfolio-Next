import { useEffect, useRef, useState } from 'react';

function useScrollParallax() {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    const handleScroll = () => {
      const elementRect = element.getBoundingClientRect();
      if (elementRect.top < window.innerHeight && elementRect.bottom > 0) {
        setIsInView(true);
      } else {
        setIsInView(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return [ref, isInView];
}

export default useScrollParallax;
