import { useEffect, useRef, useState } from 'react';

function useScrollParallax(elementRef) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    const handleScroll = () => {
      const elementRect = element.getBoundingClientRect();
      const elementMiddle = elementRect.top + elementRect.height / 2;
      const windowMiddle = window.innerHeight / 2;
      if (elementMiddle > windowMiddle && elementMiddle < windowMiddle + window.innerHeight) {
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