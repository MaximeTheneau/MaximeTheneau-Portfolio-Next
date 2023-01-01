import { useState, useEffect } from 'react';

export default function useColorText(elementId) {
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const element = elementId.current;
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      setOpacity(scroll / window.innerHeight);
      setPosition({ x: 0, y: -scroll / 5 });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (element) {
      element.style.color = `rgba(0, 0, 0, ${1 - opacity})`;
      element.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }, [opacity, element]);

  return { opacity };
}
