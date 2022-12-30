import { useState, useEffect } from 'react';

export default function useScrollClass(ref, className) {
  const [hasClass, setHasClass] = useState(false);
  useEffect(() => {
    function handleScroll() {
      const { top, bottom } = ref.current.getBoundingClientRect();
      const midpoint = (top + bottom) / 2;
      setHasClass(midpoint >= 0 && midpoint <= window.innerHeight);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, className]);

  return hasClass;
}
