import {
  useEffect, useState, RefObject, useRef,
} from 'react';

const useScrollParallaxTop = (elementRef: RefObject<HTMLDivElement>) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [transform, setTransform] = useState('none');
  const [isBot, setIsBot] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = /bot|crawl|spider|google|bing|yandex|baidu|duckduck|apple/;

    if (botPatterns.test(userAgent)) {
      setIsBot(true);
    }

    const handleScroll = () => {
      if (hasPlayed) return;

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        if (elementRef.current && !hasPlayed) {
          const { top, bottom, height } = elementRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          if (bottom > 0 && top < windowHeight) {
            const isVisible = top >= 0 && top <= window.innerHeight - height / 2;
            if (isVisible) {
              setOpacity(1);
              setHasPlayed(true);
              setTransform('translateX(0)');
            } else {
              setOpacity(0);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [elementRef, hasPlayed]);

  return {
    opacity: isBot || hasPlayed ? 1 : opacity,
    transform: isBot || hasPlayed ? 'none' : transform,
  };
};

export default useScrollParallaxTop;
