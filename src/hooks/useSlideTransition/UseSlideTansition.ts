import { useState, useEffect, RefObject } from 'react';

type Offset = {
  opacity: number;
};
export default function useSlideTransition(
  elementRef: RefObject<HTMLDivElement>,
): Offset {
  const [offset, setOffset] = useState<Offset>({
    opacity: null,

  });

  useEffect(() => {
    const handleScroll = () => {
      const { top } = elementRef.current.getBoundingClientRect();
      const opacity = 1 - (top / (window.innerHeight * 3));
      if (opacity >= 0.5 && opacity <= 1) {
        setOffset({
          opacity
        });
    };
  };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [elementRef]);

  useEffect(() => {
    if (!elementRef.current) return;
    elementRef.current.style.setProperty('opacity', `${offset?.opacity}`);
  }, [elementRef, offset]);

  return offset;
}
