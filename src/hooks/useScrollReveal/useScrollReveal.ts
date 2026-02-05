import { useEffect, useState, useRef, RefObject } from 'react';

export type RevealVariant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'none';

interface UseScrollRevealOptions {
  threshold?: number;
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
  once?: boolean;
}

interface UseScrollRevealReturn {
  ref: RefObject<HTMLDivElement>;
  style: React.CSSProperties;
  isVisible: boolean;
  isBot: boolean;
}

const botPatterns = /googlebot|bingbot|yandexbot|baidubot|duckduckbot|applebot|facebookexternalhit|linkedinbot|twitterbot|slackbot|crawler|spider/i;

const getInitialTransform = (variant: RevealVariant): string => {
  switch (variant) {
    case 'fade-up':
      return 'translateY(40px)';
    case 'fade-down':
      return 'translateY(-40px)';
    case 'fade-left':
      return 'translateX(40px)';
    case 'fade-right':
      return 'translateX(-40px)';
    case 'scale':
      return 'scale(0.9)';
    case 'none':
    default:
      return 'none';
  }
};

const useScrollReveal = (options: UseScrollRevealOptions = {}): UseScrollRevealReturn => {
  const {
    threshold = 0.1,
    delay = 0,
    duration = 600,
    variant = 'fade-up',
    once = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'ready' | 'visible'>('idle');
  const [isBot, setIsBot] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Détection des bots
    if (typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent;
      if (botPatterns.test(userAgent)) {
        setIsBot(true);
        return;
      }
    }

    const element = ref.current;
    if (!element) return;

    // Vérifier si l'élément est déjà dans le viewport
    const rect = element.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInViewport) {
      // Déjà visible : animer immédiatement après un petit délai
      requestAnimationFrame(() => {
        setState('ready');
        requestAnimationFrame(() => {
          if (delay > 0) {
            timeoutRef.current = setTimeout(() => setState('visible'), delay);
          } else {
            setState('visible');
          }
        });
      });
      if (once) return;
    } else {
      // Pas visible : préparer pour l'animation
      setState('ready');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              timeoutRef.current = setTimeout(() => setState('visible'), delay);
            } else {
              setState('visible');
            }
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setState('ready');
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [threshold, delay, once]);

  // SSR ou bot : tout visible
  if (isBot || state === 'idle') {
    return {
      ref,
      style: { opacity: 1, transform: 'none' },
      isVisible: true,
      isBot,
    };
  }

  // Animation
  const isVisible = state === 'visible';

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : getInitialTransform(variant),
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    willChange: 'opacity, transform',
  };

  return {
    ref,
    style,
    isVisible,
    isBot,
  };
};

export default useScrollReveal;
