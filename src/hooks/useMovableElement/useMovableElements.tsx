import { useState, useEffect, MutableRefObject } from 'react';

type MovableElementsStyle = {
  [key: string]: string;
};

type UseMovableElementsProps = {
};
export const useMovableElements = ({ elementRef }: { elementRef: React.MutableRefObject<HTMLDivElement> }) => {
  const [offset, setOffset] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      const { top } = elementRef.current.getBoundingClientRect();
      setOffset(top < 0 ? 0 : top / window.innerHeight * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]);

  const style: MovableElementsStyle = { '--topImg': `${offset}%`, height: '30vw' };

  return { style };
};


