import { useState, useEffect } from 'react';

export default function useMovableElements(elementRef) {
  const [offset, setOffset] = useState(null);
  console.log('offset', offset);
  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      if (elementRef.current) {
        const { top } = elementRef.current.getBoundingClientRect();
        setOffset(top < 0 ? 0 : top / window.innerHeight * 100 );
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]);

  useEffect(() => {
    if (!elementRef.current) return;
    elementRef.current.style.setProperty('--topImg', `${offset }%`);
  }, [elementRef, offset]);

  return {style: {height: `30vw`}
  };
}
