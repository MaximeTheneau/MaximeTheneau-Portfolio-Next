import { useState, useEffect, RefObject, useRef } from 'react';

type Offset = {
  opacity: number;
};

export default function useSlideTransition(
  elementRef: RefObject<HTMLDivElement>,
): Offset {
  const [offset, setOffset] = useState<Offset>({
    opacity: 1,
  });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        if (elementRef.current) {
          const { top } = elementRef.current.getBoundingClientRect();
          const opacity = 1 - (top / (window.innerHeight * 3));
          if (opacity >= 0.5 && opacity <= 1) {
            elementRef.current.style.opacity = String(opacity);
            setOffset({ opacity });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [elementRef]);

  return offset;
}
