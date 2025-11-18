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
  const isVisible = useRef(false);

  useEffect(() => {
    if (!elementRef.current) return;

    // Utiliser IntersectionObserver pour détecter la visibilité
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible.current = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );

    observer.observe(elementRef.current);

    const handleScroll = () => {
      // Ne pas traiter si l'élément n'est pas visible
      if (!isVisible.current || !elementRef.current) return;

      // Annuler le frame précédent pour éviter l'accumulation
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Batching avec requestAnimationFrame
      rafId.current = requestAnimationFrame(() => {
        if (!elementRef.current) return;

        const { top } = elementRef.current.getBoundingClientRect();
        const opacity = 1 - (top / (window.innerHeight * 3));

        if (opacity >= 0.5 && opacity <= 1) {
          // Écriture directe du style pour éviter un re-render
          elementRef.current.style.opacity = String(opacity);
          setOffset({ opacity });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [elementRef]);

  return offset;
}
