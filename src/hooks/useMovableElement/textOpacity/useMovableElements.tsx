import React from 'react';
import { useState, useEffect, useRef } from 'react';

const useMovableElements = () => {
  const [isTopChange, setIsTopChange] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const handleScroll = () => {
      const elementTop = element.getBoundingClientRect().top;
      setIsTopChange(elementTop);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return [ref, isTopChange];
}

export default useMovableElements;