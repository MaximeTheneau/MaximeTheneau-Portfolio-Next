import { useState, useEffect } from 'react';

function useAnimationSvg(speed) {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const transform = `translateY(${scroll / speed}px)`;
  return transform;
}

export default useAnimationSvg;
