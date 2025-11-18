import {
  useEffect, useState, RefObject, useRef,
} from 'react';

const useScrollParallaxTop = (elementRef: RefObject<HTMLDivElement>) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isBot, setIsBot] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = /bot|crawl|spider|google|bing|yandex|baidu|duckduck|apple/;

    if (botPatterns.test(userAgent)) {
      setIsBot(true);
      return;
    }

    if (!elementRef.current) return;

    // Utiliser IntersectionObserver pour détecter l'entrée dans le viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            // Utiliser requestAnimationFrame pour le calcul de visibilité
            rafId.current = requestAnimationFrame(() => {
              if (!elementRef.current) return;

              const { top, height } = elementRef.current.getBoundingClientRect();
              const isVisible = top >= 0 && top <= window.innerHeight - height / 2;

              if (isVisible) {
                setHasPlayed(true);
              }
            });
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px',
      }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [elementRef, hasPlayed]);

  return {
    opacity: isBot || hasPlayed ? 1 : 0,
    transform: isBot || hasPlayed ? 'none' : 'translateX(-20px)',
  };
};

export default useScrollParallaxTop;
