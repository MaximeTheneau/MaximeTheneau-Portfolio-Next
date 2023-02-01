import { useEffect, useRef, useState } from 'react';

const useScrollParallax = (elementRef) => {
  const [isInViewport, setIsInViewport] = useState(false);
  
  useEffect(() => {
    function handleScroll() {
      const { top, bottom, left, right } = elementRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      setIsInViewport(top < windowHeight && bottom >= 0 && left < windowWidth && right >= 0);
    }
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    }
  }, [elementRef]);

  return isInViewport;
}

export default useScrollParallax;
