import { useState, useEffect, useRef } from 'react';

export default function useMovableElements() {
  const [isTopChange, setIsTopChange] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const handleScroll = () => {
      const elementTop = element.getBoundingClientRect().top;
      setIsTopChange(elementTop);
      // const elementRect = element.getBoundingClientRect();
      // if (elementRect.top < window.innerHeight && elementRect.bottom > 0) {
      //   setIsTopChange(true);
      // } else {
      //   setIsTopChange(false);
      // }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return [ref, isTopChange];
}