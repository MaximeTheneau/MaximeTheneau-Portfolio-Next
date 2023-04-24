import { useState, useEffect } from 'react';

export default function useMovableElements(elementRef) {
  const [offset, setOffset] = useState(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      const { top } = elementRef.current.getBoundingClientRect();
      setOffset(top < 0 ? 0 : top / window.innerHeight * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]);

  return { style: { '--topImg': `${offset}%`, height: '30vw' } };
}