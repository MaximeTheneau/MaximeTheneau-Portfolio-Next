import { useState, useEffect } from 'react';

export default function useMovableElements(elementRef) {
  const defautTop = elementRef.current
    ? elementRef.current.getBoundingClientRect().top
    : 12;
  const [offset, setOffset] = useState(defautTop);
  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      if (elementRef.current) {
        const { top } = elementRef.current.getBoundingClientRect();
        setOffset(top / 10);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]);

  useEffect(() => {
    if (!elementRef.current) return;
    elementRef.current.children[0].style.setProperty('--topImg', `${offset}%`);
    elementRef.current.children[0].style.setProperty('--opacityImg', `${offset / 10}`);
  }, [elementRef, offset]);

  return {
    style: {
      objectPosition: '0 var(--topImg)',
      objectFit: 'cover',
      opacity: 'var(--opacityImg)',
    },
  };
}
